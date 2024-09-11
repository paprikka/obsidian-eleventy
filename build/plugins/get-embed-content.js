import { load } from "cheerio";
import { getAnchorId, hasPrefix } from "../anchor-ids.js";

/**
 * @param {import("cheerio"). Cheerio} $fileDOM
 * @param {import("cheerio"). Cheerio} $header
 * @returns {import("cheerio").Element[]}
 */
function getSectionUnderHeader($header) {
  if (!$header.length) throw new Error("No header found");
  const levels = [1, 2, 3, 4, 5, 6];
  const level = parseInt($header[0].tagName.replace("h", ""));
  const endSelector = levels
    .slice(0, level)
    .map((n) => `h${n}`)
    .join(",");

  return $header.nextUntil(endSelector);
}

export const EmbeddedContentTypes = Object.freeze({
  fragment: "fragment",
  header: "header",
  page: "page",
});

/**
 * @param {string} targetFileContent
 * @param {string} targetIdWithHash
 * @returns { { content: string, type: string, selector: string } }
 */
export const getEmbedContent = (targetFileContent, targetIdWithHash) => {
  const $fileDOM = load(targetFileContent);
  // Fragment Embed
  // TODO: separate attaching anchors and generating embeds
  // - link-markers need to be moved so that we can focus on the content and not the marker AFTER the content
  // - if we have all of this in one place, we'll end up with a ton of conditional logic
  if (!targetIdWithHash)
    return {
      content: $fileDOM("article").html(),
      type: EmbeddedContentTypes.page,
      selector: "",
    };

  // it's either #^fragment or #header-id
  const isFragmentTarget = targetIdWithHash.startsWith("#^");
  if (isFragmentTarget) {
    const $targetEl = $fileDOM(targetIdWithHash);
    const $fragment = $targetEl.parent();
    if (!$fragment) throw new Error("No fragment found");

    return {
      content: $fragment.html(),
      type: EmbeddedContentTypes.fragment,
      selector: targetIdWithHash,
    };
  }

  // Is header embed
  const targetIdNoHash = targetIdWithHash.replace(/^#/, "");
  const targetSelector = `#${getAnchorId(
    targetIdNoHash,
    true,
    !hasPrefix(targetIdNoHash),
  )}`;

  const $targetHeader = $fileDOM(targetSelector);
  if (!$targetHeader.length)
    throw new Error(`No header found [${targetSelector}]`);

  const sectionContent = getSectionUnderHeader($targetHeader).toString();
  return {
    content: `${$targetHeader.toString()}${sectionContent}`,
    type: EmbeddedContentTypes.header,
    selector: targetSelector,
  };
};
