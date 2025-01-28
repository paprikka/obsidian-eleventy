import { promises as fs } from "fs";
import grayMatter from "gray-matter";
import path from "path";
import { resolveLink, resourcePathToLink } from "./resource-index.js";
import { isRemoteUrl } from "../is-remote-url.js";

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
  const originalContent = await fs.readFile(absolutePath, "utf8");
  const frontmatter = grayMatter(originalContent).data;
  const canPublish = frontmatter.publish === true;
  if (!canPublish) return null;

  let fileContent = originalContent;
  if (!frontmatter.date) {
    try {
      const stats = await fs.stat(absolutePath);
      const lastModified = stats.mtime;
      frontmatter.date = lastModified.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      fileContent = grayMatter.stringify(originalContent, frontmatter);

      console.log(
        `Added date: ${frontmatter.date} to frontmatter of ${path.basename(absolutePath)}`,
      );
    } catch (error) {
      console.error(
        `Error getting last modified date for ${absolutePath}:`,
        error,
      );
    }
  }

  const getAnchorInternalMarkup = (_, p1, p2) => {
    return `[${p2}](<#${p1}>)`;
  };

  const getAnchorMarkup = (linkVerbatim, title) => {
    const resolvedLink = resolveLink(
      absolutePath,
      linkVerbatim,
      resourceIndex,
      ".md",
    );

    if (!resolvedLink) return `[${title}](<../${linkVerbatim}>)`;

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
    const imageRegexp = /\.(jpe?g|png|gif|bmp|svg|webp|avif)$/i;
    const hasExtension = !!src.split(".").length > 1;

    if (!imageRegexp.test(src) && hasExtension)
      return `<iframe src="${src}" class="embed embed--iframe-default" lazy />`;

    // We fall back to .md
    let resolvedLink =
      resolveLink(absolutePath, src, resourceIndex) ||
      resolveLink(absolutePath, src, resourceIndex, ".md");

    if (!resolvedLink) return `<div style='background: red' >${src}</div>`;

    const targetAbsolutePath = path.resolve(absolutePath, "../" + resolvedLink);

    // note embed
    if (!imageRegexp.test(src) && !hasExtension) {
      const id = src.split("#")[1]?.trim();
      const resolvedLink = resolveLink(absolutePath, src, resourceIndex, ".md");

      if (!resolvedLink)
        return `<span style="color: red">Missing embed: ${src}</span>`;

      const url = resourcePathToLink(resolvedLink);
      if (id) return `[Embed](<../${url}>){data-embed data-target="#${id}"}`;
      return `[Embed](<../${url}>){data-embed}`;
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
  const anchorInternal = /\[\[#([^\]]+)\|([^\]]+)\]\]/g;
  const anchorAlt = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  const anchorSimple = /\[\[([^\]]+)\]\]/g;
  const linkMarker = /(?<!#)\^([a-zA-Z0-9]{6})/g;
  // Handle link transformations
  // TODO: cover this with tests
  const content = fileContent
    .replace(anchorInternal, getAnchorInternalMarkup)
    .replace(embedAlt, getEmbedMarkup)
    .replace(embedSimple, (_, src) => {
      return getEmbedMarkup(_, src, "");
    })
    .replace(anchorAlt, (_, p1, p2) => {
      return getAnchorMarkup(p1, p2);
    })
    .replace(anchorSimple, (_, p1) => {
      return getAnchorMarkup(p1, p1);
    })
    .replace(linkMarker, (match) => {
      return `<span id="${match}" class="link-marker"></span>`;
    });

  if (!frontmatter.cover || isRemoteUrl(frontmatter.cover))
    return { absolutePath, content };

  relatedAssets.push({
    absolutePath: path.resolve(absolutePath, "..", frontmatter.cover),
  });

  return { absolutePath, content };
};
