import {
  getResourceIndex,
  resolveLink,
  resourcePathToLink,
} from "./resource-index.js";
import path from "path";
import { promises as fs } from "fs";
import grayMatter from "gray-matter";

const resourceIndex = getResourceIndex(path.join(process.cwd(), "vault"));
const markdownFiles = Object.keys(resourceIndex).reduce((result, key) => {
  const isMd = key.trim().toLowerCase().endsWith(".md");
  if (!isMd) return result;
  return [...result, ...resourceIndex[key]];
}, []);

export async function checkIfPublishable(fileContent) {
  return grayMatter(fileContent).data.publish === true;
}

const processSingleFile = async (absolutePath) => {
  const fileContent = await fs.readFile(absolutePath, "utf8");
  const canPublish = await checkIfPublishable(fileContent);
  if (!canPublish) return null;

  const getAnchorHTML = (linkVerbatim, title) => {
    const resolvedLink = resolveLink(
      absolutePath,
      linkVerbatim,
      resourceIndex,
      ".md",
    );

    if (!resolvedLink) return `<span style="color: red">${title}</span>`;

    const url = resourcePathToLink(resolvedLink);
    return `<a href="../${url}" title="${title}">${title}</a>`;
  };

  // Handle link transformations
  const content = fileContent
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, p1, p2) => {
      return getAnchorHTML(p1, p2);
    })
    .replace(/\[\[([^\]]+)\]\]/g, (_, p1) => {
      return getAnchorHTML(p1, p1);
    });

  return { absolutePath, content };
};

const filesToPublish = await Promise.all(
  markdownFiles.map((f) => processSingleFile(f)),
).then((all) => all.filter(Boolean));

console.log(filesToPublish.map((f) => f.absolutePath));
