import { promises as fs } from "fs";
import grayMatter from "gray-matter";
import path from "path";
import { resolveLink, resourcePathToLink } from "./resource-index.js";

export async function checkIfPublishable(fileContent) {
  return grayMatter(fileContent).data.publish === true;
}

function isRemoteUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function isBlockedUrl(url, blockedDomains) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return Array.from(blockedDomains).some((domain) =>
      hostname.includes(domain),
    );
  } catch (_) {
    return false;
  }
}

const blockedDomains = new Set([
  "www.youtube.com",
  "youtube.com",
  "youtu.be",
  "twitter.com",
]);

export const processSingleFile = async (
  absolutePath,
  resourceIndex,
  relatedAssets,
) => {
  const fileContent = await fs.readFile(absolutePath, "utf8");
  const canPublish = await checkIfPublishable(fileContent);
  if (!canPublish) return null;

  const getAnchorMarkup = (linkVerbatim, title) => {
    const resolvedLink = resolveLink(
      absolutePath,
      linkVerbatim,
      resourceIndex,
      ".md",
    );

    if (!resolvedLink) return `<span style="color: red">${title}</span>`;

    const url = resourcePathToLink(resolvedLink);
    return `[${title}](<../${url}>)`;
  };

  const getEmbedMarkup = (_, src, alt) => {
    // blocked
    if (isBlockedUrl(src, blockedDomains)) return `<pre> BLOCKED </pre>`;
    // remote image
    if (isRemoteUrl(src))
      return `<img src="../${src}" alt="${alt}" eleventy:ignore>`;

    // default embed
    const nonImageRegexp = /\.(jpe?g|png|gif|bmp|svg|webp)$/i;
    const hasExtension = !!src.split(".").length > 1;

    if (!nonImageRegexp.test(src) && hasExtension)
      return `<iframe src="${src}" class="embed embed--iframe-default" lazy />`;

    // We fall back to .md
    let resolvedLink =
      resolveLink(absolutePath, src, resourceIndex) ||
      resolveLink(absolutePath, src, resourceIndex, ".md");

    if (!resolvedLink) return `<div style='background: red' >${src}</div>`;

    const targetAbsolutePath = path.resolve(absolutePath, "../" + resolvedLink);

    // note embed
    if (!nonImageRegexp.test(src) && !hasExtension) {
      const id = src.split("#")[1]?.trim();
      const targetAttr = id ? `data-target="#${id}"` : "";
      return `<sonnet-embed ${targetAttr}>${resolvedLink}</sonnet-embed>`;
    }

    relatedAssets.push({ absolutePath: targetAbsolutePath });
    const escapedLink = resolvedLink
      .split("/")
      .map((segment, i, all) => {
        if (i === all.length - 1) return encodeURIComponent(segment);
        return segment;
      })
      .join("/");
    // TODO: drop encodeURIComponent once eleventyimg supports images with spaces
    // check the obsidian plugin for the corresponding fix
    return `![${alt}](${escapedLink})`;
    // return `![${alt}](${resolvedLink})`;
  };

  const embedAlt = /!\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  const embedSimple = /!\[\[([^\]]+)\]\]/g;
  const anchorAlt = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  const anchorSimple = /\[\[([^\]]+)\]\]/g;
  const linkMarker = /(?<!#)\^([a-zA-Z0-9]{6})/g;
  // Handle link transformations
  const content = fileContent
    .replace(embedAlt, getEmbedMarkup)
    .replace(embedSimple, getEmbedMarkup)
    .replace(anchorAlt, (_, p1, p2) => {
      return getAnchorMarkup(p1, p2);
    })
    .replace(anchorSimple, (_, p1) => {
      return getAnchorMarkup(p1, p1);
    })
    .replace(
      linkMarker,
      (match) => `<span id="${match}" class="link-marker">${match}</span>`,
    );

  return { absolutePath, content };
};
