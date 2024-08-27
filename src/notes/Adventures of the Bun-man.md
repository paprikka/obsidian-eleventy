---
cover: https://res.cloudinary.com/dlve3inen/image/upload/v1718045749/env-cover_sy0xhp.png?foo
publish: true
title: $ cp example.env .env (a.k.a. adventures of the Bun-man)
date: 2024-06-10
tags:
  - untested-article
---
![224](env-cover.png)

*Some late night doodles, the punchline is the same as the reason the oopsie mentioned below happened (lost track of time). Title: "nightmares of the bun man"*

I don't like war stories. They're a bit like listening to other people's dreams. Sure, they can be interesting and give you a peek into another person's mind through a stained glass window, but sometimes they're more fun *to tell* than to *listen to*. Having said that, I think there's something to learn here, for one of us at least. Maybe.


It's Thursday at 6 pm. I'm about to finish my work in one pomodoro. On Slack, I see a colleague talking about a repo with a new project they're working on. It might be cool to work on it in the future so I check out the code and start setting it up. The project is configured via a `.env` file, so let's:

```
$ cd secret-project # that didn't happen
$ cp example.env .env # that did happen but not where I wanted it to happen
```

So here's what happened: I was still in a different location, so I removed all of the 30+ environment variables used to get it running. Those include API keys, secrets, plus some esoteric and spicy config vars I do not yet understand. I had no copies of those files, do I have a sane response to why I didn't back them up in the first place. 

Getting them back will take 2-3 hours of my time. It will also waste someones else's time as they'll have to generate the new credentials for me. Yes, this is a stupid and very much avoidable situation.

And nope, it's not the end of the world, I know. But, I'm an world-class ruminator and this will annoy me till Monday. I don't want that. I'll work on self-improvement and emotional control next week. 

I have 3 terminal windows open, the `.env` file gone, the variables still in memory. However, if I type *any* command, `direnv` will wipe them. So I did what every 0.1x developer would do:

1. Ask ~~StackOverflow~~ an LLM for ways to dump the env somewhere safe
2. Write a script to restore them

### 1\. Explain the problem to an LLM and ask for a list of tools letting me read the env vars from memory:

Success! I gaze into the latent space, and the latent space gazes back, then whispers in the voice of Scarlet Johansson:

`$ printenv > filename # (you dum-dum)`

I run the command in each terminal, saving it into a different file (`env-recovered.env`, `old-env`, `what.env`). There is no reason for me to do that 3 times at this stage. Then, I copy those files into my keychain. 

The result of the `printenv` contains the entire environment of my current shell. I don't want to copy, filter and clean each field one by one. This is one of the rare instances where I'm happy to automate.

So, I write a quick script in [Quokka](https://quokkajs.com) (a decent REPL for VSCode). It's trivial:

1. get all key names from `example.env`
2. collect all lines from the restored env dump file 
	1. return all lines that start with a key mentioned in `example.env`
3. print out some stats about the env before and after so I can ensure I copied over everything

### Here's the code:

```javascript
const recovered = `
SUPER_SECRET_VAR_0=SUPER_SECRET_CODE 
SUPER_SECRET_VAR_1=SUPER_SECRET_CODE 
# ...
SUPER_SECRET_VAR_35=SUPER_SECRET_CODE 
  `;

const fields = `
SUPER_SECRET_VAR_0= 
SUPER_SECRET_VAR_1= 
# ...
SUPER_SECRET_VAR_35= 
`;

const keysToRecover = fields.split("\n").filter(Boolean);
const oldEnvLines = recovered.split("\n").filter(Boolean);

const result = keysToRecover
  .map((key) => {
    const maybeLine = oldEnvLines.find((l) => l.startsWith(key));
    if (!maybeLine) console.log(`Missing ${key}`);
    return maybeLine;
  })
  .filter(Boolean);

const stats = {
  oldItemsCount: oldEnvLines.length,
  newItemsCount: result.length,
  toRecoverCount: keysToRecover.length,
};

stats; // print the stats variable in the output panel
result;

const resultFILE = result.join("\n");
resultFILE; // print the new/recreated env file in the output panel

```

I run the script, copy the values from the output panel and paste them back into my main project. The entire thing took less than 15 minutes. Everything works like charm! I can walk my dog now. 

## Key takeaways

- Just backup your `.env` vars you filthy animal
- If you're looking for a REPL in VSCode, check out Quokka, I've been using it for years (the free version was good enough for me) 
- I could've done this without AI, but search with LLMs is particularly useful when [I don't want to think](<../LLM-powered Tools I'm Actually Using>) about the precise query. I'm not sure if it saved me time, this time, but it was there, and it was one thing less to keep in mind.

That's all for today! R.
 
