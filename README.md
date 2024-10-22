## What is this?

I'm using this project as a playground before I merge sonnet.io and untested.sonnet.io (Obsidian).

Things will move and change a lot, but if you have any questions or tips - let me know!

### TODO

- [ ] fix broken embeds in https://new.untested.sonnet.io/notes/My%20Bootleg%20T-shirts/
- [ ] fix the internal link on this page https://new.untested.sonnet.io/notes/LLM-powered%20Tools%20I'm%20Actually%20Using/#11117c
- [ ] separate DEV and BUILD caches to speed up builds
  - [ ] running pnpm dev erases the .cache folder which means that the subsequent build will have to re-fetch all of the images 
- [ ] CF/Vercel images urls seem to be escaped and breaking import
  - [ ] e.g. src/notes/Abusing and reviewing Obsidian Publish.md (`&` becomes `&amp;`)
  - [x] twitter img
- [ ] broken embeds
- [ ] handle .mp4 files treated like markdown
- [x] ignore shortcodes inside code blocks
- [ ] handle local videos (or migrate the existing ones)
- [ ] false positives for missing/dead links
- [x] broken links / dead links UX (check if publishable first, then create an index)
- [x] render dead links
- [ ] make it plomk, like potato.horse or lines.potato.horse
- [x] note embeds
- [ ] handle aliases
- [ ] handle non YT embeds
- [ ] render covers
- [ ] theme - make usable
- [ ] Importer: ignore unchanged notes when processing
- [ ] "I'm curious" - unpublished link CTA
- [ ] OG metadata
- [ ] backlinks
- [ ] handle GIF playback
- [ ] redirects
- [ ] handle animated images
- [ ] render completeness levels (e.g. fleeting, draft, article)
- [ ] footnotes
- [ ] theme - make pretty / consistent
- [ ] RSS for all notes
- [ ] merge with sonnet.io
- [ ] RSS for channels (lab, articles, newsletter)
- [ ] umami
- [ ] handle external links
- [ ] handle in-post embeds
- [ ] port content from untested
- [ ] add note dates
- [ ]
- [ ]
