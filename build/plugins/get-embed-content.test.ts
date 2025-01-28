import { test, expect } from "vitest";
import { getEmbedContent } from "./get-embed-content";

test("returns the entire article content if no targetId is provided", () => {
  const input = `<!DOCTYPE html><html><head></head><body><article><p>some content</p></article></body></html>`;

  expect(getEmbedContent(input, "").content).toBe(`<p>some content</p>`);
});

test("returns a content fragment embed", () => {
  const input = `<!doctype html>
<html>
  <head></head>
  <body>
    <article>
        <p>some content</p>
        <h2>header 2</h2>
        <p>target <span id="^target"></span></p>
        <p>even more content</p>
    </article>
  </body>
</html>
`;

  expect(getEmbedContent(input, "#^target").content).toBe(
    `target <span id="^target"></span>`,
  );
});

test.only("returns a header embed", () => {
  const input = `<!doctype html>
<html>
  <head></head>
  <body>
    <article>
        <p>some content</p>
        <h2 id="h-header">header 2</h2>
        <p>target <span id="^target-please-ignore"></span></p>
        <p>even more content</p>
        <h3>subheader</h3>
        <p>END: subhader content</p>
        <h2>a different header of the same level - should not be included</h2>
    </article>
  </body>
</html>
`;

  expect(getEmbedContent(input, "#header").content).toMatchInlineSnapshot(
    `"<h2 id="h-header">header 2</h2><p>target <span id="^target-please-ignore"></span></p><p>even more content</p><h3>subheader</h3><p>END: subhader content</p>"`,
  );
});
