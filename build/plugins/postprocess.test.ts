import { test, expect, describe } from "vitest";
import { postprocess } from "./postprocess";

const all = {
  "/hello-from-root/": {
    inputPath: "./src/hello-from-root.md",
    outputPath: "./_site/hello-from-root/index.html",
    url: "/hello-from-root/",
    content: `<html><head></head><body>
    <article>
    <a href='/exists/'>Correct link</a> 
    <a href='/something else'>Invalid link</a>
    </article>
    </body></html>`,
  },
  "/folder/path/": {
    inputPath: "./src/folder/path.md",
    outputPath: "./_site/folder/path/index.html",
    url: "/folder/path/",
    content: `<html><head></head><body>
    <article>
    <a href='/exists/'>Correct link</a> 
    <a href='../../hello-from-root'>Relative link</a>
    <a href="../">Broken Relative link</a>
    </article>
    </body></html>`,
  },
  "/exists/": {
    inputPath: "./src/exists.md",
    outputPath: "./_site/exists/index.html",
    url: "/exists/",
    content:
      '<html><head></head><body><p><a href="/a/b/c/hello">ABC</a></p>\n</body></html>',
  },
  "/has-embed/": {
    inputPath: "./src/exists.md",
    outputPath: "./_site/exists/index.html",
    url: "/exists/",
    content: `<html><head></head><body>
     <sonnet-embed></sonnet-embed> 
      </body></html>`,
  },

  "/has-a-simple-header-embed/": {
    inputPath: "./src/has-a-simple-header-embed.md",
    outputPath: "./_site/has-a-simple-header-embed/index.html",
    url: "/exists/",
    content: `<html>
  <head></head>
  <body>
    <article>
      <h1>title of the parent page</h1>
      <a href="/has-multiple-headers" data-embed data-target="#h-h4-root-1"></a>
      <p>content after header</p>
    </article>
  </body>
</html>
`.trim(),
  },
  "/has-header-embed/": {
    inputPath: "./src/has-header-embed.md",
    outputPath: "./_site/has-header-embed/index.html",
    url: "/exists/",
    content: `<html>
  <head></head>
  <body>
    <article>
      <h1>title of the parent page</h1>
      <a href="/has-multiple-headers" data-embed data-target="#h-h2-root"></a>
      <p>content after header</p>
    </article>
  </body>
</html>
`.trim(),
  },
  "/has-multiple-headers/": {
    inputPath: "./src/has-header-embed.md",
    outputPath: "./_site/exists/has-header-embed.html",
    url: "/has-header-embed/",
    content: `
    
<article>
  <p>some content</p>
  <h3 id="h-h3-root">H3 Root</h3>
  <p>some more content</p>
  <p>some more content</p>
  <!-- start: h-h2-root -->
  <h2 id="h-h2-root">H2 Root</h2>
    <h3 id="h-h3-root-1">H3 Root 1</h3>
      <h4 id="h-h4-root-1">H4 Root</h2>
        <p>some content in H2 Root 1</p>
        <p>some more content in H2 Root 1</p>
    <h3 id="h-h3-root-2">H3 Root 2</h3>
    <p>some content in H3 Root 2</p>
    <h4 id="h-h4-root">H4 Root</h4>
    <p>some more content in H4 Root</p>
  <!-- end: h-h2-root -->
  <h2 id="h-h2-root-2">H2 Root 2</h2>
  <p>some content in H2 Root 2</p>
</article>
`.trim(),
  },
};

test("returns the current page unchanged", async () => {
  expect(await postprocess(all["/exists/"], all)).toEqual(
    all["/exists/"].content,
  );
});

test("marks a broken link", async () => {
  const current = all["/hello-from-root/"];
  expect(await postprocess(current, all)).toMatchInlineSnapshot(`
    "<html><head></head><body>
        <article>
        <a href="/exists/">Correct link</a> 
        <a href="/something else" class="link link--broken">Invalid link</a>
        </article>
        </body></html>"
  `);
});

test("marks relative links", async () => {
  expect(await postprocess(all["/folder/path/"], all)).toMatchInlineSnapshot(`
    "<html><head></head><body>
        <article>
        <a href="/exists/">Correct link</a> 
        <a href="../../hello-from-root">Relative link</a>
        <a href="../" class="link link--broken">Broken Relative link</a>
        </article>
        </body></html>"
  `);
});

test("handles full note embeds", async () => {
  expect(await postprocess(all["/folder/path/"], all)).toMatchInlineSnapshot(`
    "<html><head></head><body>
        <article>
        <a href="/exists/">Correct link</a> 
        <a href="../../hello-from-root">Relative link</a>
        <a href="../" class="link link--broken">Broken Relative link</a>
        </article>
        </body></html>"
  `);
});

// It works already
test.todo("handles ^fragment embeds");

test("handles simple #header embeds", async () => {
  const result = await postprocess(all["/has-a-simple-header-embed/"], all);
  expect(result).toMatchInlineSnapshot(`
    "<html><head></head>
      <body>
        <article>
          <h1>title of the parent page</h1>
          <blockquote class="embed embed--note"><a href="/has-header-embed/#h-h4-root-1" class="embed__source">Source</a><h4 id="h-h4-root-1">H4 Root</h4><p>some content in H2 Root 1</p><p>some more content in H2 Root 1</p></blockquote>
          <p>content after header</p>
        </article>
      
    </body></html>"
  `);
});

test.only("handles #header embeds", async () => {
  const result = await postprocess(all["/has-header-embed/"], all);
  expect(result).toMatchInlineSnapshot(`
    "<html><head></head>
      <body>
        <article>
          <h1>title of the parent page</h1>
          <blockquote class="embed embed--note"><a href="/has-header-embed/#h-h2-root" class="embed__source">Source</a><h2 id="h-h2-root">H2 Root</h2><h3 id="h-h3-root-1">H3 Root 1</h3><h4 id="h-h4-root-1">H4 Root</h4><p>some content in H2 Root 1</p><p>some more content in H2 Root 1</p><h3 id="h-h3-root-2">H3 Root 2</h3><p>some content in H3 Root 2</p><h4 id="h-h4-root">H4 Root</h4><p>some more content in H4 Root</p></blockquote>
          <p>content after header</p>
        </article>
      
    </body></html>"
  `);
});
