---
publish: true
date: 2025-02-26
---
While people are arguing about Svelte on the orange site, please enjoy my new reactive state library™:

```ts
const state = new Proxy(
  {},
  {
    set(target, property, value) {
      target[property] = value;
      renderUpdate();
      return true;
    },
  }
);
```

<span id="^30891e" class="link-marker"></span>

(I like Svelte)
(let's call the library Ergo)
(don't overthink this, I didn't)