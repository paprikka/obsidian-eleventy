import { slugify } from "./slugify.ts";
import type { Cheerio } from "cheerio";

const PREFIX = "h-";

export const getAnchorIdForHeader = (text: string, needsEncoding: boolean): string =>
  getAnchorId(text, needsEncoding, true);

export const hasPrefix = (textWithOrWithoutHash: string): boolean =>
  textWithOrWithoutHash.startsWith(PREFIX) ||
  textWithOrWithoutHash.startsWith(`#${PREFIX}`);

export const getAnchorId = (text: string, needsEncoding: boolean, needsPrefix: boolean): string => {
  const prefix = needsPrefix ? PREFIX : "";
  if (!needsEncoding) return `${prefix}${slugify(decodeURIComponent(text))}`;
  // TODO: why are we doing this encode/decode song and dance? double check
  const textEncoded = encodeURIComponent(text.trim());
  return `${prefix}${slugify(decodeURIComponent(textEncoded))}`;
};

/**
 * @param {import("cheerio"). Cheerio} $headerEl
 */
export const getHeaderIdFromEl = ($headerEl: Cheerio): string => {
  const id = $headerEl.attr("id");
  if (id) return getAnchorIdForHeader(id, false);

  return getAnchorIdForHeader($headerEl.text(), true);
};
