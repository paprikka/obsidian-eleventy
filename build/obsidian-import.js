import {
  getResourceIndex,
  resolveLink,
  resourcePathToLink,
} from "./resource-index.js";
import path from "path";

export function obsidianLinksMarkdownPlugin(resourceIndex) {
  return function obsPluginInstance(state) {
    console.log({ state });
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.type === "inline" && token.children) {
        const children = token.children;

        for (let j = 0; j < children.length; j++) {
          const childToken = children[j];

          if (
            childToken.type === "text" &&
            childToken.content.includes("![[")
          ) {
            let text = childToken.content;

            // Handle image transformations first
            text = text.replace(
              /!\[\[([^\]|]+)\|([^\]]+)\]\]/g,
              '<img src="https://placehold.co/600x400/png" alt="$2" />',
            );
            // .replace(/!\[\[([^\]]+)\]\]/g, function (_, p1) {
            //   if (
            //     /https:\/\/(twitter\.com|youtube\.com|youtu\.be)/.test(p1)
            //   ) {
            //     return `<iframe src="${p1}" />`;
            //   } else if (/\.(png|jpg|jpeg|gif)$/.test(p1)) {
            //     return `<img src="https://placehold.co/600x400/png" alt="${p1}" />`;
            //   } else {
            //     return `<iframe src="./${p1}" />`;
            //   }
            // });

            // Replace the child token with an HTML token
            const htmlToken = new state.Token("html_inline", "", 0);
            htmlToken.content = text;
            children[j] = htmlToken;
          }
        }

        for (let j = 0; j < children.length; j++) {
          const childToken = children[j];

          if (childToken.type === "text" && childToken.content.includes("[[")) {
            const text = childToken.content;

            const getAnchorHTML = (linkVerbatim, title) => {
              const { inputPath } = state.env.page;
              const absoluteInputPath = path.join(process.cwd(), inputPath);
              const resolvedLink = resolveLink(
                absoluteInputPath,
                linkVerbatim,
                resourceIndex,
                ".md",
              );

              if (!resolvedLink)
                return `<span style="color: red">${title}</span>`;

              const url = resourcePathToLink(resolvedLink);
              return `<a href="../${url}" title="${title}">${title}</a>`;
            };

            // Handle link transformations
            const newContent = text
              .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, p1, p2) => {
                return getAnchorHTML(p1, p2);
              })
              .replace(/\[\[([^\]]+)\]\]/g, (_, p1) => {
                return getAnchorHTML(p1, p1);
              });

            // Replace the child token with an HTML token
            const htmlToken = new state.Token("html_inline", "", 0);
            htmlToken.content = newContent;
            children[j] = htmlToken;
          }
        }
      }
    }
  };
}

export const importObsidianMarkdown = (mdLib) => {
  const resourceIndex = getResourceIndex(path.join(process.cwd(), "./src/sol"));

  mdLib.use(function (md) {
    md.core.ruler.after(
      "inline",
      "obsidianLinksToHtml",
      obsidianLinksMarkdownPlugin,
    );
  });
};
