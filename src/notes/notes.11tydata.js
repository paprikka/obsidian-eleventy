export default {
  layout: "note.njk",
  pageClass: "note",
  isArticle: true,
  permalink: "/{{ page.filePathStem | slugifyPermalink }}/",
  collection: "notes",

  eleventyComputed: {
    title: (data) => data.title || data.page.fileSlug,
  },
};
