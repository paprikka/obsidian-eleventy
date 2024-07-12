import cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function ObsidianImportPlugin(eleventyConfig) {
  eleventyConfig.addTransform(
    "processEmbeds",
    async function (content, outputPath) {
      // Only process HTML files
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }
      const $ = cheerio.load(content);
      const sonnetEmbeds = $("sonnet-embed");

      if (sonnetEmbeds.length === 0) {
        return content;
      }

      console.log(`Found embeds in ${outputPath}`);
      try {
        await Promise.all(
          sonnetEmbeds.map(async (index, element) => {
            const relativeFilePath = $(element).text().trim();
            const relativeFilePathNormalised = relativeFilePath
              .split(".")
              .slice(0, -1)
              .join(".");

            const absoluteFilePath = path.resolve(
              path.dirname(outputPath),
              "../",
              relativeFilePathNormalised,
              "index.html",
            );

            if (!absoluteFilePath) {
              console.warn(
                `Empty file path in <sonnet-embed> at index ${index}`,
              );
              return;
            }

            try {
              const fileContent = await fs.readFile(absoluteFilePath, "utf8");
              const $embedContent = cheerio.load(fileContent)("article").html();
              if (outputPath.includes("Fig")) {
                console.log(
                  `Replacing ${relativeFilePath} with ${$embedContent}`,
                );
              }
              $(element).replaceWith($embedContent);
            } catch (err) {
              console.error(
                `Error reading file [${absoluteFilePath}]:\nMessage: ${err.message}`,
              );
              $(element).replaceWith(
                `<!-- Error loading ${absoluteFilePath}: ${err.message} -->`,
              );
            }
          }),
        );

        return $.html();
      } catch (err) {
        console.error(`Error processing sonnet embeds: ${err.message}`);
        return content;
      }
    },
  );
}
