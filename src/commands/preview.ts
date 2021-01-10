import chokidar from 'chokidar';
import puppeteer from 'puppeteer';
import path from 'upath';
import { buildArtifacts } from '../builder';
import {
  collectVivliostyleConfig,
  getVivliostyleConfigPath,
  mergeConfig,
} from '../config';
import { getBrokerUrl, launchSourceAndBrokerServer } from '../server';
import {
  debug,
  gracefulError,
  launchBrowser,
  logSuccess,
  startLogging,
  stopLogging,
  useTmpDirectory,
} from '../util';
import { PreviewCliFlags, setupPreviewParserProgram } from './preview.parser';

const program = setupPreviewParserProgram();
program.parse(process.argv);

let timer: NodeJS.Timeout;

preview({
  input: program.args?.[0],
  configPath: program.config,
  theme: program.theme,
  size: program.size,
  title: program.title,
  author: program.author,
  language: program.language,
  verbose: program.verbose,
  timeout: program.timeout,
  sandbox: program.sandbox,
  executableChromium: program.executableChromium,
}).catch(gracefulError);

export default async function preview(cliFlags: PreviewCliFlags) {
  startLogging('Preparing preview');

  const vivliostyleConfigPath = getVivliostyleConfigPath(cliFlags.configPath);
  const vivliostyleConfig = collectVivliostyleConfig(vivliostyleConfigPath);

  const context = vivliostyleConfig
    ? path.dirname(vivliostyleConfigPath)
    : process.cwd();

  const [tmpDir, clear] = await useTmpDirectory();

  try {
    const config = await mergeConfig(
      cliFlags,
      vivliostyleConfig,
      context,
      tmpDir,
    );

    // build artifacts
    const { manifestPath } = await buildArtifacts(config);

    const [source, broker] = await launchSourceAndBrokerServer(
      config.workspaceDir,
    );

    const url = getBrokerUrl({
      sourceIndex: path.relative(config.workspaceDir, manifestPath),
      sourcePort: source.port,
      brokerPort: broker.port,
    });

    debug(
      `Executing Chromium path: ${
        config.executableChromium || puppeteer.executablePath()
      }`,
    );
    const browser = await launchBrowser({
      headless: false,
      executablePath: config.executableChromium || puppeteer.executablePath(),
      args: [config.sandbox ? '' : '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0 });
    await page.goto(url);

    stopLogging('Up and running ([ctrl+c] to quit)', '🚀');

    function handleChangeEvent(path: string) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        startLogging(`Rebuilding ${path}`);
        // build artifacts
        buildArtifacts(config);
        page.reload();
        logSuccess(`Built ${path}`);
      }, 2000);
    }

    chokidar
      .watch('**', {
        ignored: (p: string) => {
          return (
            /node_modules|\.git/.test(p) || p.startsWith(config.workspaceDir)
          );
        },
        cwd: context,
      })
      .on('all', (event, path) => {
        if (!/\.(md|markdown|html?|css|jpe?g|png|gif|svg)$/i.test(path)) return;
        handleChangeEvent(path);
      });
  } finally {
    clear();
  }
}
