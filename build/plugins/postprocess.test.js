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
    rawInput: "[ABC](/a/b/c/hello)\n",
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
    rawInput: "[ABC](/a/b/c/hello)\n",
  },
  "/exists/": {
    inputPath: "./src/exists.md",
    outputPath: "./_site/exists/index.html",
    url: "/exists/",
    content:
      '<html><head></head><body><p><a href="/a/b/c/hello">ABC</a></p>\n</body></html>',
    rawInput: "[ABC](/a/b/c/hello)\n",
  },
};

test("returns the current page unchanged", () => {
  expect(postprocess(all["/exists/"], all)).toEqual(all["/exists/"].content);
});

test("marks a broken link", () => {
  const current = all["/hello-from-root/"];
  expect(postprocess(current, all)).toMatchInlineSnapshot(`
    "<html><head></head><body>
        <article>
        <a href="/exists/">Correct link</a> 
        <a href="/something else" class="link link--broken">Invalid link</a>
        </article>
        </body></html>"
  `);
});

test("marks relative links", () => {
  expect(postprocess(all["/folder/path/"], all)).toMatchInlineSnapshot(`
    "<html><head></head><body>
        <article>
        <a href="/exists/">Correct link</a> 
        <a href="../../hello-from-root">Relative link</a>
        <a href="../" class="link link--broken">Broken Relative link</a>
        </article>
        </body></html>"
  `);
});
