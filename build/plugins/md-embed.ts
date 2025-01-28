import { escapeHtml } from "../escape-html.ts";
import type MarkdownIt from "markdown-it";
import type { MarkdownItRenderer } from "../types/markdown-it-plugin.ts";
import type Token from "../types/markdown-it-token.ts";

const getYTVideoUrlFromSrc = (src: string): string | undefined => {
  if (src.includes("youtube.com")) {
    const url = new URL(src);
    const videoId = url.searchParams.get("v");
    const playlistId = url.searchParams.get("list");

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    }
  }

  if (src.includes("youtu.be")) {
    const videoId = src.split("/").at(-1)?.trim();
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
};

const renderTweet = (src: string, alt: string | undefined): string => {
  const tweetId = src.split("/").at(-1)?.trim();
  const { XITTER_API_KEY, XITTER_URL } = process.env;
  return `
  <a href='${src}' noopener noreferrer class='embed embed--twitter'>
    <img src='${XITTER_URL}/${tweetId}?api_key=${XITTER_API_KEY}' } alt="${escapeHtml(alt || "")}" />
  </a>`.trim();
};

const getTitleAttr = (str: string | undefined): string => 
  str ? ` title="${escapeHtml(str)}"` : "";

export const mdEmbed = function (md: MarkdownIt & MarkdownItRenderer, env: any): void {
  md.renderer.rules.image = function (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: any
  ): string {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    const src = token.attrs?.[srcIndex]?.[1];
    if (!src) return "";
    
    const maybeTitle = token.children?.at(0)?.content;
    const titleAttr = getTitleAttr(maybeTitle);

    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const videoUrl = getYTVideoUrlFromSrc(src);
      if (!videoUrl)
        return `<div class="debug-alert">Missing YT URL: ${src}</div>`;

      return `<iframe class='embed embed--youtube' lazy width="560" height="315" src="${videoUrl}" ${titleAttr} frameborder="0" allowfullscreen></iframe>`;
    }

    if (src.includes("twitter.com")) return renderTweet(src, maybeTitle);

    return self.renderToken(tokens, idx, options);
  };
};
