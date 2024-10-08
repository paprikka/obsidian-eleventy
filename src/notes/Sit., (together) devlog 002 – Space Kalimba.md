---
cover: https://images.ctfassets.net/hyylafu4fjks/yspsIf2WNhPUy2rIAD8GM/5e26a8b284c44b5159c7364235c9f720/120539466_177280657319386_3338556339530525352_n_17894788447616091.jpg
publish: true
date: 2023-10-26
tags:
  - untested-article
---

I had a few more hours to play with [Sit., (together)](<../Sit., (together)>) (the *toy*). I thought I'd share my progress.

(demo link [here](https://nothing-together.sonnet.io))
## New stuff:

Now users can communicate by sending each other little chirps!

<span style="color: red">Missing embed: chirps.mp4</span>

Here's how this works:

1. Select a user on the map.
2. Use the little keyboard at the top to chirp.
3. They'll be able to see where the message came from and respond to you.

### SFX

Finding the type of sound that would work here and then figuring out the best way of generating it took more than half of my time working on this in the past two days.

I wanted to have 5-7 sounds which could be composed into little melodies or "phrases", for the lack of a better word. I have a little finger piano at home, and regardless of however you play it, it just sounds so sweet. (I might sample them myself in the next update.)

I tried several approaches:

#### Fully generative audio with [Tone.js](https://tonejs.github.io).

This approach gives me plenty of control when it comes to pitch, reverb and duration of sounds. However, the sounds I wanted to use tended to be fairly complex (harmonically rich) and  thus difficult to reproduce. I have neither enough time nor the experience to create anything I'd be happy with quality-wise.

#### Use a real recording, change pitch dynamically

This is a good compromise, but I couldn't find the right samples given the self-imposed time constraints. I'm slow.

The first two approaches reminded me of the work of [Tero Parviainen](https://teropa.info)—my old colleague and the most experienced person I know when it comes to anything related to generative audio.

Be sure to check out his work. Some of his stuff is just wild! When it comes to my little experiment, I found these two particularly interesting:

- [Euclidean Rhythms](https://codepen.io/teropa/full/zPEYbY)
- [Dancing Markov Gymnopédies](https://codepen.io/teropa/full/bRqYVj)

#### Use recorded samples for each sound effect:

It's relatively easy to implement and should sound *good enough* for now.

I'm still not happy with how little control over pitch, duration, reverb this approach gives me. And I don't like that I'm working with a patchwork of different sounds. Stylistic coherence/continuity suffered a bit. However, I'm one person working on design, code, UX and audio here. I need to make compromises.

The bottomline is that there are no shortcuts here. I will need to put more time and work into this. I can create a consistent design and a decent architecture but working with audio (for me) is a matter of trial and error + a tonne of guesswork. I'm ok with that.

I went with some sounds samples from pixabay and freesound. These are free resources. *Free* is just another word for *probably more expensive than the (paid) alternatives*, since you'll need to put more time into curating them.

My advice: don't repeat my mistakes here!

Finally, I went with a simple scale played on a finger piano, with every note isolated. I sliced the sample and split it into separate files played with Howler.js. Another approach would be to keep the original file and use audio sprites, but I find multiple files easier to work with.

![](audacity-screenshot.webp)

I also accidentally went to some [dark places](https://pixabay.com/sound-effects/cat-piano-87087/) when searching for the right sample.

## Communicating via simple chirps: alternatives

- *many → 1*  instead of *1 → 1*:  allow other users to subscribe to the sounds coming from you instead of having unidirectional communication from one user to another
- *1 → many*: broadcast chirps instead of sending them to a single user

## Other changes:

I added some little developer experience improvements, such as feature toggles set via query parameters:
	- `debug-dot-count`
	- `debug-skip-overlay`
	- `volume`

In hindsight this was a waste of time.

I'm not completely happy with the results but they're good enough for a proof of concept. I'll use higher quality audio in the full app.


## Next steps

I think I've learned enough to build [The Group Meditation Tool](<../Sit., (together)>). But I'd like to wrap it up and share in a usable shape:

1. make the UX more obvious so people know how to play
2. fix minor audio glitches
3. add a domain and share so people can play with it
4. **(optional, but fun!) add an AI agent to respond to your chirps and continue the melody (honestly a Markov chain might do as well). You chirp and it chirps back at you. Perhaps it even starts the conversation with you first!**

### The tool:

- I will probably use rxjs client-side because this would make handling events, drawing, and user interactions so much easier. It felt like overkill here.
- I will probably use pixijs to create animations (or greensock as a compromise). I want to be able to easily blend different animation layers and have more dynamic transitions between animation states (e.g. repeated chirp animations are hard to get right with @keyframe based animations). I never expected to miss Unity!

## Finally:

**I will rush less.** I wasted so much time trying to get this done in under a few hours.

I tried to take 2-3 hours each day to focus on feature work, but I've been feeling a bit under the weather recently and struggled with focus. I noticed that when this happens I lose context of what's important.

I'm happy with what I have here, but I think we don't talk often enough about managing our mental resources when working on projects like this one.

Give it a go and let me know what you think!
