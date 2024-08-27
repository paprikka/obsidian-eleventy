---
cover: https://res.cloudinary.com/dlve3inen/image/upload/v1705007540/card_jhnttu.png
publish: true
date: 2024-01-11
tags:
  - untested-article
---
*One of the reasons I started untested was to [Work With the Garage Door Up](<../Work With the Garage Door Up>), so this year I'll try to share more smaller, unfinished snippets of work, including the stuff that didn't go as expected. *

## Problem

Earlier this week I posted a note on Turning Sit. into a PWA ([Sit. Offline Mode](<../Sit. Offline Mode>)). In short: the process was surprisingly easy as nowadays we have a ton of well-tested tools to lean on when building PWAs.

Then, a day after I shipped it, I had a very pleasant, and *a bit longer than usual* meditation session. In fact, when I opened my eyes I noticed that I was late, the screen was black and the gong had never sounded. So, what happened?

First, some technical context. There are two ways for a website to force a mobile device to stay awake:

- trigger video playback (the old way)
- use the [Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/WakeLock) (the fancy way)

*Sit.* uses feature detection to apply the right approach (start with `Wake Lock`, fall back to some `<video>` element black magic fuckery. The user taps on the *start session* button and we arm the media player to enable autoplay (the gong sound), but also ask the device nicely (or [not that nicely](https://www.npmjs.com/package/@zakj/no-sleep)) to stay awake. 

This works well for regular web pages, but breaks in PWA mode because of a not yet fixed [iOS bug](https://bugs.webkit.org/show_bug.cgi?id=254545). Ironically, PWA feels like a more obvious use case for app-like features like this.

## Solution

Only iOS in PWA mode is affected (Android works fine in both cases). I'll log the number of iOS sessions in PWA mode and leave the code as it is. Apple does a great job of discouraging people from treating websites as apps and there's no need to work on a fix before we know the impact.

```ts
  // Sit. is written in Solid.js
onMount(() => {
	if (
		"standalone" in window.navigator
		&& window.navigator.standalone
	) {
	  Tracking.track("ios:standalone");
	}
});
```

### Then (choose 1)

1\. Run a user agent check and don't serve the Web App Manifest for iOS users:

👎 might generate some ugly 404s if I do it in the lazy way (and I will)
👍 users won't know a thing

2\. Warn users who open Sit. PWA mode

👎 annoying as the user has already made the effort to install the app, but also
👍 less annoying to every other user who just opened Sit. on an iPhone for the first time



