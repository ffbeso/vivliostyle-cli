/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type PublicationContexts =
  | []
  | ["https://schema.org"]
  | [
      "https://schema.org",
      "https://www.w3.org/ns/pub-context",
      ...(
        | string
        | {
            language: BCP47LanguageTag;
            direction?: false;
            [k: string]: unknown;
          }
        | {
            direction: "ltr" | "rtl";
            language?: false;
            [k: string]: unknown;
          }
        | {
            language: BCP47LanguageTag;
            direction: "ltr" | "rtl";
            [k: string]: unknown;
          }
        | {
            language?: false;
            direction?: false;
            [k: string]: unknown;
          }
      )[]
    ];
export type BCP47LanguageTag = string;
export type URL = string;
export type UniqueStrings = string | string[];
export type ListsOfItemList = SchemaOrgItemListObject | SchemaOrgItemListObject[];
export type LocalizableStringOrObject = string | (string | LocalizableStringObject)[] | LocalizableStringObject;
export type Contributor = string | (string | ContributorObject)[] | ContributorObject;
export type URLs = string | string[];
export type Duration = string;
export type Languages = BCP47LanguageTag | BCP47LanguageTag[];
export type Dates = string;
export type ResourceCategorization = (URL | PublicationLinks) | (URL | PublicationLinks)[];

export interface PublicationManifest {
  "@context": PublicationContexts;
  type?: string | string[];
  conformsTo: URL | URL[];
  id?: string;
  abridged?: boolean;
  accessMode?: UniqueStrings;
  accessModeSufficient?: ListsOfItemList;
  accessibilityFeature?: UniqueStrings;
  accessibilityHazard?: UniqueStrings;
  accessibilitySummary?: LocalizableStringOrObject;
  artist?: Contributor;
  author?: Contributor;
  colorist?: Contributor;
  contributor?: Contributor;
  creator?: Contributor;
  editor?: Contributor;
  illustrator?: Contributor;
  inker?: Contributor;
  letterer?: Contributor;
  penciler?: Contributor;
  publisher?: Contributor;
  readBy?: Contributor;
  translator?: Contributor;
  url?: URLs;
  duration?: Duration;
  inLanguage?: Languages;
  dateModified?: Dates;
  datePublished?: Dates;
  name?: LocalizableStringOrObject;
  readingOrder?: ResourceCategorization;
  resources?: ResourceCategorization;
  links?: ResourceCategorization;
  readingProgression?: "ltr" | "rtl";
  [k: string]: unknown;
}
export interface SchemaOrgItemListObject {
  type: "ItemList" | string[];
  itemListElement: string[];
  [k: string]: unknown;
}
export interface LocalizableStringObject {
  value: string;
  language?: BCP47LanguageTag;
  [k: string]: unknown;
}
export interface ContributorObject {
  name: LocalizableStringOrObject;
  id?: URL;
  type?: ("Person" | "Organization") | string[];
  url?: URL;
  identifier?: string[];
  [k: string]: unknown;
}
export interface PublicationLinks {
  type?: "LinkedResource" | string[];
  url: URL;
  encodingFormat?: string;
  name?: LocalizableStringOrObject;
  description?: string | LocalizableStringObject;
  rel?: string | string[];
  integrity?: string;
  duration?: Duration;
  alternate?: ResourceCategorization;
  [k: string]: unknown;
}
