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

const resourceIndex = getResourceIndex(sourceBase);
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

  // Handle link transformations
  const content = fileContent
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, p1, p2) => {
      return getAnchorMarkup(p1, p2);
    })
    .replace(/\[\[([^\]]+)\]\]/g, (_, p1) => {
      return getAnchorMarkup(p1, p1);
    });

  return { absolutePath, content };
};

async function copyEntries(entries, sourceBase, destinationBase) {
  const copyFilePromises = entries.map(async ({ absolutePath, content }) => {
    const relativePath = path.relative(sourceBase, absolutePath);
    const destinationPath = path.join(destinationBase, relativePath);
    const destinationDir = path.dirname(destinationPath);

    await fs.mkdir(destinationDir, { recursive: true });
    await fs.writeFile(destinationPath, content);
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

await copyEntries(filesToPublish, sourceBase, destinationBase);
