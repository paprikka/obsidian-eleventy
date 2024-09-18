export default {
  layout: "note.njk",
  pageClass: "note",
  isArticle: true,
  permalink: "/notes/{{ page.fileSlug | slugify }}/",
  collection: "notes",

  eleventyComputed: {
    title: (data) => data.title || data.page.fileSlug,
  },
};
