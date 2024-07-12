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

// Example usage
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
      return `<sonnet-embed>${resolvedLink}</sonnet-embed>`;
    }

    relatedAssets.push({ absolutePath: targetAbsolutePath });

    return `![${alt}](${resolvedLink})`;
  };

  const embedAlt = /!\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  const embedSimple = /!\[\[([^\]]+)\]\]/g;
  const anchorAlt = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  const anchorSimple = /\[\[([^\]]+)\]\]/g;
  const linkMarker = /\^([a-zA-Z0-9]{6})/g;
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

// const embedRegex = /___EMBED___"([^"]+)"___END_EMBED___/g;
// export const resourceHasEmbeds = (resource) =>
//   embedRegex.test(resource.content);
//
// export const processEmbed = async (resource, filesByAbsolutePath) => {
//   const updatedContent = resource.content.replace(
//     embedRegex,
//     (_match, embedAbsolutePath) => {
//       return (
//         filesByAbsolutePath[embedAbsolutePath.trim()] ||
//         `Missing: ${embedAbsolutePath}`
//       );
//     },
//   );
//
//   return { ...resource, content: updatedContent };
// };
