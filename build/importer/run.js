import {
  getResourceIndex,
  resolveLink,
  resourcePathToLink,
} from "./resource-index.js";
import path from "path";
import { promises as fs } from "fs";
import grayMatter from "gray-matter";

const sourceBase = path.join(process.cwd(), "vault");
const destinationBase = path.join(process.cwd(), "src/notes");
const relatedAssets = [];

const resourceIndex = getResourceIndex(sourceBase);
const markdownFiles = Object.keys(resourceIndex).reduce((result, key) => {
  const isMd = key.trim().toLowerCase().endsWith(".md");
  if (!isMd) return result;
  return [...result, ...resourceIndex[key]];
}, []);

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

const processSingleFile = async (absolutePath) => {
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
    const hasExtension = !!src.split(".").length;
    if (!nonImageRegexp.test(src) && hasExtension)
      return `<iframe src="${src}" class="embed embed--iframe-default" lazy />`;

    const resolvedLink = resolveLink(absolutePath, src, resourceIndex);

    if (!resolvedLink) return `<div style='background: red' >${src}</div>`;

    const targetAbsolutePath = path.resolve(absolutePath, "../" + resolvedLink);

    // note embed
    if (!nonImageRegexp.test(src) && !hasExtension) {
      const note = require("fs").readFileSync(targetAbsolutePath, "utf8");
      return `<div class="embed"> ${note}</div>`;
    }
    relatedAssets.push({ absolutePath: targetAbsolutePath });

    return `![${alt}](${resolvedLink})`;
  };

  // Handle link transformations
  const content = fileContent
    .replace(
      /!\[\[([^\]|]+)\|([^\]]+)\]\]/g,
      getEmbedMarkup,
      // '<img src="https://placehold.co/600x400/png" alt="$2" />',
    )
    .replace(/!\[\[([^\]]+)\]\]/g, getEmbedMarkup)

    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, p1, p2) => {
      return getAnchorMarkup(p1, p2);
    })
    .replace(/\[\[([^\]]+)\]\]/g, (_, p1) => {
      return getAnchorMarkup(p1, p1);
    });

  return { absolutePath, content };
};

async function exportEntries(entries, sourceBase, destinationBase) {
  const copyFilePromises = entries.map(async ({ absolutePath, content }) => {
    const relativePath = path.relative(sourceBase, absolutePath);
    const destinationPath = path.join(destinationBase, relativePath);
    const destinationDir = path.dirname(destinationPath);

    await fs.mkdir(destinationDir, { recursive: true });
    await fs.writeFile(destinationPath, content);
  });

  await Promise.all(copyFilePromises);
}

let hasRun = false;
async function copyAssets(assets, sourceBase, destinationBase) {
  const copyFilePromises = assets.map(async ({ absolutePath }) => {
    const relativePath = path.relative(sourceBase, absolutePath);
    const destinationPath = path.join(destinationBase, relativePath);
    const destinationDir = path.dirname(destinationPath);

    try {
      await fs.mkdir(destinationDir, { recursive: true });
      await fs.copyFile(absolutePath, destinationPath);
    } catch (error) {
      if (!hasRun) {
        hasRun = true;
        console.log(absolutePath);
      }

      // console.table({ absolutePath, destinationPath });
    }
  });

  await Promise.all(copyFilePromises);
}

const filesToPublish = await Promise.all(
  markdownFiles.map((f) => processSingleFile(f)),
).then((all) => all.filter(Boolean));

console.log(
  "Files to publish:",
  filesToPublish.map((_) => _.absolutePath),
);

await copyAssets(relatedAssets, sourceBase, destinationBase);
await exportEntries(filesToPublish, sourceBase, destinationBase);
