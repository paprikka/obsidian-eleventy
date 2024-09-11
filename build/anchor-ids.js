import { slugify } from "./slugify.js";

const PREFIX = "h-";

export const normalizeLocalLinkHref = (linkHref) => {
  if (linkHref.startsWith("#^")) return linkHref;
  return `#${getAnchorId(linkHref, true, true)}`;
};

export const getAnchorIdForLink = (
  linkIdAttr,
  needsEncoding,
  needsPrefix = false,
) => {
  if (linkIdAttr.startsWith("#^")) return linkIdAttr.slice(1);
  return getAnchorId(linkIdAttr, needsEncoding, needsPrefix);
};
export const getAnchorIdForHeader = (text, needsEncoding) =>
  getAnchorId(text, needsEncoding, true);

export const hasPrefix = (textWithOrWithoutHash) =>
  textWithOrWithoutHash.startsWith(PREFIX) ||
  textWithOrWithoutHash.startsWith(`#${PREFIX}`);

export const getAnchorId = (text, needsEncoding, needsPrefix) => {
  const prefix = needsPrefix ? PREFIX : "";
  if (!needsEncoding) return `${prefix}${slugify(decodeURIComponent(text))}`;
  // TODO: why are we doing this encode/decode song and dance? double check
  const textEncoded = encodeURIComponent(text.trim());
  return `${prefix}${slugify(decodeURIComponent(textEncoded))}`;
};

/**
 * @param {import("cheerio"). Cheerio} $headerEl
 */
export const getHeaderIdFromEl = ($headerEl) => {
  if ($headerEl.attr("id"))
    return getAnchorIdForHeader($headerEl.attr("id"), false);

  return getAnchorIdForHeader($headerEl.text(), true);
};
