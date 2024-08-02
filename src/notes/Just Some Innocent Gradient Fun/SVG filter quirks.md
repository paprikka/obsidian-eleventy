---
publish: true
---
### SVG can't he hidden using `display:none` on Firefox:
<sonnet-embed >../innocent-gradients-svg-firefox.avif</sonnet-embed>

To fix, make it visually hidden without changing the display mode.

### The *posterize* effect looks drastically different across FF, Chrome and Safari.

### In Safari, SVG filter values don't update until the DOM is redrawn 

This applies to SVG filters referenced in CSS. You could even remove the SVG element and things would still work ([Possibly related WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=246106).)

To fix: don't rely on CSS selectors to toggle filter values. Instead, specify the filters inline in `style` then toggle them via JS.

