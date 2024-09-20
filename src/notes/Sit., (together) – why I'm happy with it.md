---
publish: true
date: '2024-08-22'
---

I'm rarely happy with my work. I'm consciously trying to get better at appreciating the effort put in it, instead of going through the grind and moving on as soon as I share the work ([The Importance of Celebrating Your Own Work](<../The Importance of Celebrating Your Own Work>)).

I consider [Sit (together)](https://nothing-together.sonnet.io) a successful experiment because of *luck* and *happy little accidents*:

1. **Luck:** I received a decent amount of user feedback due to the traffic coming from the top HN board. (I think dang was kind enough to add my submission to the second-chance queue, but I can only guess)
2. **Happy little accidents:** I used it to spike and test a few technical and design approaches:
	- What's the lifecycle of a *guest user* or a *session*?
	- Do my visualisations help or confuse users? 
	- What are the main domain entities? 
	- Should I use `WebAudio` or `<audio />`?)

Now I have a much clearer idea of what users want, but also I know better what ***I* don't want to deal with** e.g.: rendering using canvas, managing sockets without RxJS, over-abstracting the types of messages sent between the clients.
