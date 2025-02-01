/**
 * A Markdown-it plugin that wraps hashtags in <span class="tag"> elements.
 * Tags must start with # and contain alphanumeric characters or hyphens.
 * The # symbol is not included in the wrapped span.
 */

const tagRegex = /(^|\s)#([a-zA-Z0-9][-a-zA-Z0-9]*(?![\w/-]))/g;

export default function tagPlugin(md) {
  md.core.ruler.after("inline", "hashtags", (state) => {
    state.tokens.forEach((token) => {
      if (token.type === "inline" && token.children) {
        processChildren(token.children, state);
      }
    });
  });
}

function processChildren(children, state) {
  const newChildren = [];
  let inLink = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    // Track when we enter and exit links
    if (child.type === "link_open") {
      inLink = true;
      newChildren.push(child);
      continue;
    }
    if (child.type === "link_close") {
      inLink = false;
      newChildren.push(child);
      continue;
    }

    // Skip processing if we're in a code block or currently inside a link
    if (child.type === "text" && !isInsideCode(child) && !inLink) {
      let lastIndex = 0;
      let match;
      const content = child.content;

      while ((match = tagRegex.exec(content)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newChildren.push(new state.Token("text", "", 0));
          newChildren[newChildren.length - 1].content = content.slice(
            lastIndex,
            match.index,
          );
        }

        // Add the space before the tag if it exists
        if (match[1]) {
          newChildren.push(new state.Token("text", "", 0));
          newChildren[newChildren.length - 1].content = match[1];
        }

        // Create tag span tokens
        const openSpan = new state.Token("tag_open", "span", 1);
        openSpan.attrs = [["class", "tag"]];

        const text = new state.Token("text", "", 0);
        text.content = match[2];

        const closeSpan = new state.Token("tag_close", "span", -1);

        newChildren.push(openSpan, text, closeSpan);

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after last match
      if (lastIndex < content.length) {
        newChildren.push(new state.Token("text", "", 0));
        newChildren[newChildren.length - 1].content = content.slice(lastIndex);
      }
    } else {
      newChildren.push(child);
    }
  }

  children.length = 0;
  children.push(...newChildren);
}

// Helper function to check if we're inside a code block
function isInsideCode(token) {
  const parent = token.parent;
  return (
    parent &&
    (parent.type === "code_inline" ||
      parent.type === "code_block" ||
      parent.type === "fence")
  );
}
