export const mdEmbed = function (md) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    const src = token.attrs[srcIndex][1];

    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const url = new URL(src);
      const videoId = url.searchParams.get("v");
      const playlistId = url.searchParams.get("list");

      if (videoId) {
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      } else if (playlistId) {
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" frameborder="0" allowfullscreen></iframe>`;
      }
    }

    return self.renderToken(tokens, idx, options);
  };
};
