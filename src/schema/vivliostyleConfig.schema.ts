/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type VivliostyleConfigSchema = CoreProps;
export type Entry = string;
export type EntryObject = ContentsEntryObject | ArticleEntryObject;
export type Output = string;

export interface CoreProps {
  /**
   * Title
   */
  title?: string;
  /**
   * Author
   */
  author?: string;
  /**
   * Theme package path or URL of css file.
   */
  theme?: string;
  /**
   * Entry file(s) of document.
   */
  entry: Entry | ArticleEntryObject | (Entry | EntryObject)[];
  /**
   * Directory of referencing entry file(s).
   */
  entryContext?: string;
  /**
   * Options about outputs.
   */
  output?: (Output | OutputObject)[] | Output | OutputObject;
  workspaceDir?: string;
  includeAssets?: Entry[] | Entry;
  /**
   * Output pdf size [Letter]. preset: A5, A4, A3, B5, B4, JIS-B5, JIS-B4, letter, legal, ledger. custom(comma separated): 182mm,257mm or 8.5in,11in.
   */
  size?: string;
  /**
   * Make generated PDF compatible with press ready PDF/X-1a [false]. This option is equivalent with "preflight": "press-ready"
   */
  pressReady?: boolean;
  /**
   * Language
   */
  language?: string;
  readingProgression?: "ltr" | "rtl";
  toc?: boolean | string;
  tocTitle?: string;
  cover?: string;
  /**
   * Timeout limit for waiting Vivliostyle process [60s]
   */
  timeout?: number;
  /**
   * Option for convert Markdown to a stringify (HTML).
   */
  vfm?: {
    /**
     * Custom stylesheet path/URL.
     */
    style?: string | string[];
    /**
     * Output markdown fragments.
     */
    partial?: boolean;
    /**
     * Document title (ignored in partial mode).
     */
    title?: string;
    /**
     * Document language (ignored in partial mode).
     */
    language?: string;
    /**
     * Replacement handler for HTML string.
     */
    replace?: VfmReplaceRule[];
    /**
     * Add `<br>` at the position of hard line breaks, without needing spaces.
     */
    hardLineBreaks?: boolean;
    /**
     * Disable automatic HTML format.
     */
    disableFormatHtml?: boolean;
    /**
     * Enable math syntax.
     */
    math?: boolean;
    [k: string]: unknown;
  };
  /**
   * Specify a docker image to render.
   */
  image?: string;
  /**
   * Launch an HTTP server hosting contents instead of file protocol. It is useful that requires CORS such as external web fonts.
   */
  http?: boolean;
  /**
   * Specify a URL of displaying viewer instead of vivliostyle-cli's one. It is useful that using own viewer that has staging features. (ex: https://vivliostyle.vercel.app/)
   */
  viewer?: string;
  [k: string]: unknown;
}
export interface ArticleEntryObject {
  path: string;
  title?: string;
  theme?: string;
  encodingFormat?: string;
  rel?: string | string[];
}
export interface ContentsEntryObject {
  rel: "contents";
  title?: string;
  theme?: string;
}
export interface OutputObject {
  /**
   * Specify output file name or directory [<title>.pdf].
   */
  path: string;
  /**
   * Specify output format.
   */
  format?: string;
  /**
   * if docker is set, Vivliostyle try to render PDF on Docker container [local].
   */
  renderMode?: "local" | "docker";
  /**
   * Apply the process to generate PDF for printing.
   */
  preflight?: "press-ready" | "press-ready-local";
  /**
   * Options for preflight process (ex: gray-scale, enforce-outline). Please refer the document of press-ready for further information. https://github.com/vibranthq/press-ready
   */
  preflightOption?: string[];
}
export interface VfmReplaceRule {
  test: RegExp;
  match: (result: RegExpMatchArray, h: any) => Object | string;
}
