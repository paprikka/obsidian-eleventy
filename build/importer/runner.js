import { promises as fs } from "fs";
import path from "path";
import { processSingleFile } from "./process-file.js";
import { getResourceIndex } from "./resource-index.js";

export const run = async () => {
  const sourceBase = path.join(process.cwd(), "vault");
  const destinationBase = path.join(process.cwd(), "src/notes");
  const relatedAssets = [];

  const resourceIndex = getResourceIndex(sourceBase);
  const markdownFiles = Object.keys(resourceIndex).reduce((result, key) => {
    const isMd = key.trim().toLowerCase().endsWith(".md");
    if (!isMd) return result;
    return [...result, ...resourceIndex[key]];
  }, []);

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

      // TODO: drop when eleventy-image-transform supports spaces in local paths
      const destinationPathEscaped = path.join(
        path.dirname(destinationPath),
        encodeURIComponent(path.basename(destinationPath)),
      );
      // if (destinationPathEscaped !== destinationPath) {
      //   console.log({
      //     destinationPath,
      //     destinationPathEscaped,
      //   });
      // }
      try {
        await fs.mkdir(destinationDir, { recursive: true });
        // await fs.copyFile(absolutePath, destinationPath);
        await fs.copyFile(absolutePath, destinationPathEscaped);
      } catch (error) {
        if (!hasRun) {
          hasRun = true;
          console.log(
            `Cannot copy asset: [${absolutePath}] to [${destinationDir}]`,
          );
        }
      }
    });

    await Promise.all(copyFilePromises);
  }

  const filesToPublish = await Promise.all(
    markdownFiles.map((f) =>
      processSingleFile(f, resourceIndex, relatedAssets),
    ),
  ).then((all) => all.filter(Boolean));

  console.log(`📘 Total files to publish: ${filesToPublish.length}`);

  await copyAssets(relatedAssets, sourceBase, destinationBase);
  await exportEntries(filesToPublish, sourceBase, destinationBase);

  console.log(`✏️ done`);
};
