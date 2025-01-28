import { promises as fs } from "fs";
import path from "path";
import { processSingleFile } from "./process-file.ts";
import { getResourceIndex, type ResourceIndex } from "./resource-index.ts";

type FileEntry = {
  absolutePath: string;
  content: string;
};

type AssetEntry = {
  absolutePath: string;
};

export const run = async (): Promise<void> => {
  const sourceBase = path.join(process.cwd(), "vault");
  const destinationBase = path.join(process.cwd(), "src/notes");
  const relatedAssets: AssetEntry[] = [];

  const resourceIndex: ResourceIndex = getResourceIndex(sourceBase);
  const markdownFiles = Object.keys(resourceIndex).reduce<string[]>((result, key) => {
    const isMd = key.trim().toLowerCase().endsWith(".md");
    if (!isMd) return result;
    return [...result, ...resourceIndex[key]];
  }, []);

  async function exportEntries(
    entries: FileEntry[],
    sourceBase: string,
    destinationBase: string
  ): Promise<void> {
    const copyFilePromises = entries.map(async ({ absolutePath, content }) => {
      const relativePath = path.relative(sourceBase, absolutePath);
      const destinationPath = path.join(destinationBase, relativePath);
      const destinationDir = path.dirname(destinationPath);

      await fs.mkdir(destinationDir, { recursive: true });

      try {
        const existingContent = await fs.readFile(destinationPath, "utf-8");
        if (existingContent === content) {
          console.log(`[ importer ] SKIP ${relativePath} (content unchanged)`);
          return;
        } else {
          console.log(`[ importer ] UPDATE ${relativePath}`);
        }
      } catch (error) {
        console.log(`[ importer ] CREATE ${relativePath}`);
      }

      await fs.writeFile(destinationPath, content);
    });

    await Promise.all(copyFilePromises);
  }

  let hasRun = false;
  async function copyAssets(
    assets: AssetEntry[],
    sourceBase: string,
    destinationBase: string
  ): Promise<void> {
    const copyFilePromises = assets.map(async ({ absolutePath }) => {
      const relativePath = path.relative(sourceBase, absolutePath);
      const destinationPath = path.join(destinationBase, relativePath);
      const destinationDir = path.dirname(destinationPath);

      // TODO: drop when eleventy-image-transform supports spaces in local paths
      const destinationPathEscaped = path.join(
        path.dirname(destinationPath),
        encodeURIComponent(path.basename(destinationPath)),
      );

      try {
        await fs.mkdir(destinationDir, { recursive: true });
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

  const filesToPublish = (await Promise.all(
    markdownFiles.map((f) =>
      processSingleFile(f, resourceIndex, relatedAssets),
    ),
  ).then((all) => all.filter((item): item is FileEntry => item !== null)));

  console.log(`📘 Total files to publish: ${filesToPublish.length}`);

  await copyAssets(relatedAssets, sourceBase, destinationBase);
  await exportEntries(filesToPublish, sourceBase, destinationBase);

  console.log(`✏️ done`);
};
