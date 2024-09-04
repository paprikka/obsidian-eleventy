import { escapeHtml } from "../escape-html.js";
const getYTVideoUrlFromSrc = (src) => {
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
    const videoId = src.split("/").at(-1).trim();
    return `https://www.youtube.com/embed/${videoId}`;
  }
};

export const mdEmbed = function (md, env) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    const src = token.attrs[srcIndex][1];
    const maybeTitle = token.children.at(0)?.content;

    console.log("alt", { maybeAlt: maybeTitle });
    const titleAttr = maybeTitle ? ` title="${escapeHtml(maybeTitle)}"` : "";
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const videoUrl = getYTVideoUrlFromSrc(src);
      if (!videoUrl)
        return `<div class="debug-alert">Missing YT URL: ${src}</div>`;

      return `<iframe class='embed embed--youtube' lazy width="560" height="315" src="${videoUrl}" ${titleAttr} frameborder="0" allowfullscreen></iframe>`;
    }
    if (src.includes("twitter.com")) {
      return ` <a class="debug-alert" href="${src}">Embedded tweet (work in progress!)  </a>`;
    }
    return self.renderToken(tokens, idx, options);
  };
};
