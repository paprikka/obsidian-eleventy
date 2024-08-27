export default function taskListPlugin(md) {
  const classes = {
    wip: "task-list__item--wip",
    done: "task-list__item--done",
    todo: "task-list__item--todo",
    item: "task-list__item",
    list: "task-list",
    marker: "task-list__marker",
  };

  // Add a custom renderer for bullet list open
  md.renderer.rules.bullet_list_open = function (
    tokens,
    idx,
    options,
    env,
    self,
  ) {
    // Check if the list contains task items
    const nextToken = tokens[idx + 1];
    if (
      nextToken &&
      nextToken.type === "list_item_open" &&
      tokens[idx + 3] &&
      tokens[idx + 3].content.match(/^\[([ x\/])\]/)
    ) {
      // If it's a task list, add the 'task-list' class
      return '<ul class="' + classes.list + '">\n';
    }
    // If it's not a task list, render the default <ul>
    return self.renderToken(tokens, idx, options);
  };

  // The rest of the code remains unchanged
  md.renderer.rules.list_item_open = function (
    tokens,
    idx,
    options,
    env,
    self,
  ) {
    const token = tokens[idx];
    if (
      token.markup === "-" &&
      tokens[idx + 2].content.match(/^\[([ x\/])\]/)
    ) {
      const status = tokens[idx + 2].content.charAt(1);
      let className = classes.item;
      if (status === "x") {
        className = `${classes.item} ${classes.done}`;
      } else if (status === "/") {
        className = `${classes.item} ${classes.wip}`;
      } else {
        className = `${classes.item} ${classes.todo}`;
      }
      token.attrJoin("class", className);
      return `<li class="${className}">`;
    }
    return self.renderToken(tokens, idx, options);
  };

  md.inline.ruler.before("text", "task_list", function (state, silent) {
    if (silent) return false;
    const pos = state.pos;
    const ch = state.src.charCodeAt(pos);
    if (ch !== 0x5b /* [ */) return false;

    const match = state.src.slice(pos).match(/^\[([ x\/])\]/);
    if (!match) return false;

    state.pos += match[0].length;
    return true;
  });
}
