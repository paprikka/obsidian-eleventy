const input = `
<ol>
    <li data-line="0" dir="auto"><a data-href="111" href="https://untested.sonnet.io/111" class="internal-link" target="_blank" rel="noopener nofollow">111</a></li>
    <li data-line="1" dir="auto"><a data-href="Visual Snapshot Tests, Cheap Bastard Edition™" href="https://untested.sonnet.io/Visual+Snapshot+Tests%2C+Cheap+Bastard+Edition%E2%84%A2" class="internal-link" target="_blank" rel="noopener nofollow">Visual Snapshot Tests, Cheap Bastard Edition™</a></li>
    <li data-line="2" dir="auto"><a data-href="Instead or writing a comment, write a post and link it" href="https://untested.sonnet.io/Instead+or+writing+a+comment%2C+write+a+post+and+link+it" class="internal-link" target="_blank" rel="noopener nofollow">Instead or writing a comment, write a post and link it</a></li>
    <li data-line="3" dir="auto"><a data-href="How to draw a Janusz" href="https://untested.sonnet.io/How+to+draw+a+Janusz" class="internal-link" target="_blank" rel="noopener nofollow">How to draw a Janusz</a></li>
    <li data-line="4" dir="auto"><a data-href="Physical uncolouring book" href="https://untested.sonnet.io/Physical+uncolouring+book" class="internal-link" target="_blank" rel="noopener nofollow">Physical uncolouring book</a></li>
    <li data-line="5" dir="auto"><a data-href="Dog mode" href="https://untested.sonnet.io/Dog+mode" class="internal-link" target="_blank" rel="noopener nofollow">Dog mode</a></li>
    <li data-line="6" dir="auto"><a data-href="&quot;I understand&quot;" href="https://untested.sonnet.io/%22I+understand%22" class="internal-link" target="_blank" rel="noopener nofollow">"I understand"</a></li>
    <li data-line="7" dir="auto"><a data-href="Projects and apps I built for my own well-being" href="https://untested.sonnet.io/Projects+and+apps+I+built+for+my+own+well-being" class="internal-link" target="_blank" rel="noopener nofollow">Projects and apps I built for my own well-being</a></li>
    <li data-line="8" dir="auto"><a data-tooltip-position="top" aria-label="The modern Web has lost the User Agent" data-href="The modern Web has lost the User Agent" href="https://untested.sonnet.io/The+modern+Web+has+lost+the+User+Agent" class="internal-link" target="_blank" rel="noopener nofollow">What Happened to the User Agent?</a></li>
    <li data-line="9" dir="auto"><a data-href="retrospective.png" href="https://untested.sonnet.io/retrospective.png" class="internal-link" target="_blank" rel="noopener nofollow">retrospective.png</a></li>
    <li data-line="10" dir="auto"><a data-href="Things to support my own well-being – a wishlist" href="https://untested.sonnet.io/Things+to+support+my+own+well-being+%E2%80%93+a+wishlist" class="internal-link" target="_blank" rel="noopener nofollow">Things to support my own well-being – a wishlist</a></li>
    <li data-line="11" dir="auto"><a data-href="Chilli for Your Mom" href="https://untested.sonnet.io/Chilli+for+Your+Mom" class="internal-link" target="_blank" rel="noopener nofollow">Chilli for Your Mom</a></li>
    <li data-line="12" dir="auto"><a data-href="Demon Tamagotchis" href="https://untested.sonnet.io/Demon+Tamagotchis" class="internal-link" target="_blank" rel="noopener nofollow">Demon Tamagotchis</a></li>
    <li data-line="13" dir="auto"><a data-href="Be kind, be curious" href="https://untested.sonnet.io/Be+kind%2C+be+curious" class="internal-link" target="_blank" rel="noopener nofollow">Be kind, be curious</a></li>
    <li data-line="14" dir="auto"><a data-tooltip-position="top" aria-label="40" data-href="40" href="https://untested.sonnet.io/TIL/weekly/40" class="internal-link" target="_blank" rel="noopener nofollow">Week #40</a></li>
    <li data-line="15" dir="auto"><a data-href="Journey" href="https://untested.sonnet.io/Journey" class="internal-link" target="_blank" rel="noopener nofollow">Journey</a></li>
    <li data-line="16" dir="auto"><a data-href="Medieval Content Farm and Procedural Cheese" href="https://untested.sonnet.io/Medieval+Content+Farm+and+Procedural+Cheese" class="internal-link" target="_blank" rel="noopener nofollow">Medieval Content Farm and Procedural Cheese</a></li>
    <li data-line="17" dir="auto"><a data-href="Sit., (together)" href="https://untested.sonnet.io/Sit.%2C+(together)" class="internal-link" target="_blank" rel="noopener nofollow">Sit., (together)</a></li>
    <li data-line="18" dir="auto"><a data-href="Stream of Consciousness Morning Notes" href="https://untested.sonnet.io/Stream+of+Consciousness+Morning+Notes" class="internal-link" target="_blank" rel="noopener nofollow">Stream of Consciousness Morning Notes</a></li>
    <li data-line="19" dir="auto"><a data-tooltip-position="top" aria-label="41" data-href="41" href="https://untested.sonnet.io/TIL/weekly/41" class="internal-link" target="_blank" rel="noopener nofollow">Week #41</a></li>
    <li data-line="20" dir="auto"><a data-href="Vercel, Svelte and Doom-Driven Development" href="https://untested.sonnet.io/Vercel%2C+Svelte+and+Doom-Driven+Development" class="internal-link" target="_blank" rel="noopener nofollow">Vercel, Svelte and Doom-Driven Development</a></li>
    <li data-line="21" dir="auto"><a data-href="Alternatives to Adobe" href="https://untested.sonnet.io/Alternatives+to+Adobe" class="internal-link" target="_blank" rel="noopener nofollow">Alternatives to Adobe</a></li>
    <li data-line="22" dir="auto"><a data-href="Natural Gradients in CSS" href="https://untested.sonnet.io/Natural+Gradients+in+CSS" class="internal-link" target="_blank" rel="noopener nofollow">Natural Gradients in CSS</a></li>
    <li data-line="23" dir="auto"><a data-href="Here's a List of Toys" href="https://untested.sonnet.io/Here's+a+List+of+Toys" class="internal-link" target="_blank" rel="noopener nofollow">Here's a List of Toys</a></li>
    <li data-line="24" dir="auto"><a data-tooltip-position="top" aria-label="42" data-href="42" href="https://untested.sonnet.io/TIL/weekly/42" class="internal-link" target="_blank" rel="noopener nofollow">Week #42</a></li>
    <li data-line="25" dir="auto"><a data-href="Sit., (together) devlog 001" href="https://untested.sonnet.io/Sit.%2C+(together)+devlog+001" class="internal-link" target="_blank" rel="noopener nofollow">Sit., (together) devlog 001</a></li>
    <li data-line="26" dir="auto"><a data-href="Proteus - Uncertainty is the only Certainty" href="https://untested.sonnet.io/Proteus+-+Uncertainty+is+the+only+Certainty" class="internal-link" target="_blank" rel="noopener nofollow">Proteus - Uncertainty is the only Certainty</a></li>
    <li data-line="27" dir="auto"><a data-href="Obsidian for Vampires" href="https://untested.sonnet.io/Obsidian+for+Vampires" class="internal-link" target="_blank" rel="noopener nofollow">Obsidian for Vampires</a></li>
    <li data-line="28" dir="auto"><a data-href="Sit., (together) devlog 002 – Space Kalimba" href="https://untested.sonnet.io/Sit.%2C+(together)+devlog+002+%E2%80%93+Space+Kalimba" class="internal-link" target="_blank" rel="noopener nofollow">Sit., (together) devlog 002 – Space Kalimba</a></li>
    <li data-line="29" dir="auto"><a data-tooltip-position="top" aria-label="43" data-href="43" href="https://untested.sonnet.io/TIL/weekly/43" class="internal-link" target="_blank" rel="noopener nofollow">Week #43</a></li>
    <li data-line="30" dir="auto"><a data-href="The Janusz I Live In" href="https://untested.sonnet.io/The+Janusz+I+Live+In" class="internal-link" target="_blank" rel="noopener nofollow">The Janusz I Live In</a></li>
    <li data-line="31" dir="auto"><a data-href="Dogs and Palimpsests" href="https://untested.sonnet.io/Dogs+and+Palimpsests" class="internal-link" target="_blank" rel="noopener nofollow">Dogs and Palimpsests</a></li>
    <li data-line="32" dir="auto"><a data-href="Night Rider" href="https://untested.sonnet.io/Night+Rider" class="internal-link" target="_blank" rel="noopener nofollow">Night Rider</a></li>
    <li data-line="33" dir="auto"><a data-href="Bless this Mess" href="https://untested.sonnet.io/Bless+this+Mess" class="internal-link" target="_blank" rel="noopener nofollow">Bless this Mess</a></li>
    <li data-line="34" dir="auto"><a data-tooltip-position="top" aria-label="44" data-href="44" href="https://untested.sonnet.io/TIL/weekly/44" class="internal-link" target="_blank" rel="noopener nofollow">Week #44</a></li>
    <li data-line="35" dir="auto"><a data-href="Sit., part 2 – devlog 001" href="https://untested.sonnet.io/Sit.%2C+part+2+%E2%80%93+devlog+001" class="internal-link" target="_blank" rel="noopener nofollow">Sit., part 2 – devlog 001</a></li>
    <li data-line="36" dir="auto"><a data-href="Why I Didn't Study Computer Science" href="https://untested.sonnet.io/Why+I+Didn't+Study+Computer+Science" class="internal-link" target="_blank" rel="noopener nofollow">Why I Didn't Study Computer Science</a></li>
    <li data-line="37" dir="auto"><a data-href="Spiritual Volleyball" href="https://untested.sonnet.io/Spiritual+Volleyball" class="internal-link" target="_blank" rel="noopener nofollow">Spiritual Volleyball</a></li>
    <li data-line="38" dir="auto"><a data-href="Leading or Line Height - a Measured Response" href="https://untested.sonnet.io/Leading+or+Line+Height+-+a+Measured+Response" class="internal-link" target="_blank" rel="noopener nofollow">Leading or Line Height - a Measured Response</a></li>
    <li data-line="39" dir="auto"><a data-tooltip-position="top" aria-label="45" data-href="45" href="https://untested.sonnet.io/TIL/weekly/45" class="internal-link" target="_blank" rel="noopener nofollow">Week #45</a></li>
    <li data-line="40" dir="auto"><a data-href="Bird-knife" href="https://untested.sonnet.io/Bird-knife" class="internal-link" target="_blank" rel="noopener nofollow">Bird-knife</a></li>
    <li data-line="41" dir="auto"><a data-href="Heart of Dorkness" href="https://untested.sonnet.io/Heart+of+Dorkness" class="internal-link" target="_blank" rel="noopener nofollow">Heart of Dorkness</a></li>
    <li data-line="42" dir="auto"><a data-href="Web and Feedback Loops" href="https://untested.sonnet.io/Web+and+Feedback+Loops" class="internal-link" target="_blank" rel="noopener nofollow">Web and Feedback Loops</a></li>
    <li data-line="43" dir="auto"><a data-href="Share your unfinished, scrappy work" href="https://untested.sonnet.io/Share+your+unfinished%2C+scrappy+work" class="internal-link" target="_blank" rel="noopener nofollow">Share your unfinished, scrappy work</a></li>
    <li data-line="44" dir="auto"><a data-tooltip-position="top" aria-label="46" data-href="46" href="https://untested.sonnet.io/TIL/weekly/46" class="internal-link" target="_blank" rel="noopener nofollow">Week #46</a></li>
    <li data-line="45" dir="auto"><a data-href="MISS – Make It Stupid, Simple" href="https://untested.sonnet.io/MISS+%E2%80%93+Make+It+Stupid%2C+Simple" class="internal-link" target="_blank" rel="noopener nofollow">MISS – Make It Stupid, Simple</a></li>
    <li data-line="46" dir="auto"><a data-href="How to optimise images for Obsidian Publish" href="https://untested.sonnet.io/How+to+optimise+images+for+Obsidian+Publish" class="internal-link" target="_blank" rel="noopener nofollow">How to optimise images for Obsidian Publish</a></li>
    <li data-line="47" dir="auto"><a data-href="How I Use Obsidian to Publish These Notes" href="https://untested.sonnet.io/How+I+Use+Obsidian+to+Publish+These+Notes" class="internal-link" target="_blank" rel="noopener nofollow">How I Use Obsidian to Publish These Notes</a></li>
    <li data-line="48" dir="auto"><a data-href="Abusing and reviewing Obsidian Publish" href="https://untested.sonnet.io/Abusing+and+reviewing+Obsidian+Publish" class="internal-link" target="_blank" rel="noopener nofollow">Abusing and reviewing Obsidian Publish</a></li>
    <li data-line="49" dir="auto"><a data-tooltip-position="top" aria-label="47" data-href="47" href="https://untested.sonnet.io/TIL/weekly/47" class="internal-link" target="_blank" rel="noopener nofollow">Week #47</a></li>
    <li data-line="50" dir="auto"><a data-href="Portuguese Orange, Persian Portugal" href="https://untested.sonnet.io/Portuguese+Orange%2C+Persian+Portugal" class="internal-link" target="_blank" rel="noopener nofollow">Portuguese Orange, Persian Portugal</a></li>
    <li data-line="51" dir="auto"><a data-href="Default Apps 2023" href="https://untested.sonnet.io/Default+Apps+2023" class="internal-link" target="_blank" rel="noopener nofollow">Default Apps 2023</a></li>
    <li data-line="52" dir="auto"><a data-href="Fermi Paradox (for 35-Year-Olds)" href="https://untested.sonnet.io/Fermi+Paradox+(for+35-Year-Olds)" class="internal-link" target="_blank" rel="noopener nofollow">Fermi Paradox (for 35-Year-Olds)</a></li>
    <li data-line="53" dir="auto"><a data-href="Communication is Action" href="https://untested.sonnet.io/Communication+is+Action" class="internal-link" target="_blank" rel="noopener nofollow">Communication is Action</a></li>
    <li data-line="54" dir="auto"><a data-tooltip-position="top" aria-label="48" data-href="48" href="https://untested.sonnet.io/TIL/weekly/48" class="internal-link" target="_blank" rel="noopener nofollow">Week #48</a></li>
    <li data-line="55" dir="auto"><a data-href="Find Your Tribe" href="https://untested.sonnet.io/Find+Your+Tribe" class="internal-link" target="_blank" rel="noopener nofollow">Find Your Tribe</a></li>
    <li data-line="56" dir="auto"><a data-href="Auto-hibernate Subscriptions" href="https://untested.sonnet.io/Auto-hibernate+Subscriptions" class="internal-link" target="_blank" rel="noopener nofollow">Auto-hibernate Subscriptions</a></li>
    <li data-line="57" dir="auto"><a data-href="Midnight Ramen" href="https://untested.sonnet.io/Midnight+Ramen" class="internal-link" target="_blank" rel="noopener nofollow">Midnight Ramen</a></li>
    <li data-line="58" dir="auto"><a data-href="Shader Park is Kinda Neat" href="https://untested.sonnet.io/Shader+Park+is+Kinda+Neat" class="internal-link" target="_blank" rel="noopener nofollow">Shader Park is Kinda Neat</a></li>
    <li data-line="59" dir="auto"><a data-tooltip-position="top" aria-label="49" data-href="49" href="https://untested.sonnet.io/TIL/weekly/49" class="internal-link" target="_blank" rel="noopener nofollow">Week #49</a></li>
    <li data-line="60" dir="auto"><a data-href="Midnight Shader" href="https://untested.sonnet.io/Midnight+Shader" class="internal-link" target="_blank" rel="noopener nofollow">Midnight Shader</a></li>
    <li data-line="61" dir="auto"><a data-href="Building a private, clutter-free browser on top of Safari" href="https://untested.sonnet.io/Building+a+private%2C+clutter-free+browser+on+top+of+Safari" class="internal-link" target="_blank" rel="noopener nofollow">Building a private, clutter-free browser on top of Safari</a></li>
    <li data-line="62" dir="auto"><a data-href="Shader Park and 2D" href="https://untested.sonnet.io/Shader+Park+and+2D" class="internal-link" target="_blank" rel="noopener nofollow">Shader Park and 2D</a></li>
    <li data-line="63" dir="auto"><a data-href="Texas Friendship Massacre" href="https://untested.sonnet.io/Texas+Friendship+Massacre" class="internal-link" target="_blank" rel="noopener nofollow">Texas Friendship Massacre</a></li>
    <li data-line="64" dir="auto"><a data-tooltip-position="top" aria-label="50" data-href="50" href="https://untested.sonnet.io/TIL/weekly/50" class="internal-link" target="_blank" rel="noopener nofollow">Week #50</a></li>
    <li data-line="65" dir="auto"><a data-href="My Now Page" href="https://untested.sonnet.io/My+Now+Page" class="internal-link" target="_blank" rel="noopener nofollow">My Now Page</a></li>
    <li data-line="66" dir="auto"><a data-tooltip-position="top" aria-label="Project Cemetery" data-href="Project Cemetery" href="https://untested.sonnet.io/Project+Cemetery" class="internal-link" target="_blank" rel="noopener nofollow">Project Sematary</a></li>
    <li data-line="67" dir="auto"><a data-href="My Bootleg T-shirts" href="https://untested.sonnet.io/My+Bootleg+T-shirts" class="internal-link" target="_blank" rel="noopener nofollow">My Bootleg T-shirts</a></li>
    <li data-line="68" dir="auto"><a data-href="How I Make My Bootleg T-shirts" href="https://untested.sonnet.io/How+I+Make+My+Bootleg+T-shirts" class="internal-link" target="_blank" rel="noopener nofollow">How I Make My Bootleg T-shirts</a></li>
    <li data-line="69" dir="auto"><a data-href="Places to Find Indie Web Content" href="https://untested.sonnet.io/Places+to+Find+Indie+Web+Content" class="internal-link" target="_blank" rel="noopener nofollow">Places to Find Indie Web Content</a></li>
    <li data-line="70" dir="auto"><a data-href="What's a Peach?" href="https://untested.sonnet.io/What's+a+Peach%3F" class="internal-link" target="_blank" rel="noopener nofollow">What's a Peach?</a></li>
    <li data-line="71" dir="auto"><a data-href="Cacio e pepe with black garlic" href="https://untested.sonnet.io/Cacio+e+pepe+with+black+garlic" class="internal-link" target="_blank" rel="noopener nofollow">Cacio e pepe with black garlic</a></li>
    <li data-line="72" dir="auto"><a data-href="Patreon and Ownership" href="https://untested.sonnet.io/Patreon+and+Ownership" class="internal-link" target="_blank" rel="noopener nofollow">Patreon and Ownership</a></li>
    <li data-line="73" dir="auto"><a data-href="Montaigne" href="https://untested.sonnet.io/Montaigne" class="internal-link" target="_blank" rel="noopener nofollow">Montaigne</a></li>
    <li data-line="74" dir="auto"><a data-href="Sit. Offline Mode" href="https://untested.sonnet.io/Sit.+Offline+Mode" class="internal-link" target="_blank" rel="noopener nofollow">Sit. Offline Mode</a></li>
    <li data-line="75" dir="auto"><a data-href="FAQs are a Dark Orange Flag" href="https://untested.sonnet.io/FAQs+are+a+Dark+Orange+Flag" class="internal-link" target="_blank" rel="noopener nofollow">FAQs are a Dark Orange Flag</a></li>
    <li data-line="76" dir="auto"><a data-href="Sleepy Safari" href="https://untested.sonnet.io/Sleepy+Safari" class="internal-link" target="_blank" rel="noopener nofollow">Sleepy Safari</a></li>
    <li data-line="77" dir="auto"><a data-tooltip-position="top" aria-label="51" data-href="51" href="https://untested.sonnet.io/TIL/weekly/51" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #11</a></li>
    <li data-line="78" dir="auto"><a data-href="Why is it So Hard to Respond to Positive Comments" href="https://untested.sonnet.io/Why+is+it+So+Hard+to+Respond+to+Positive+Comments" class="internal-link" target="_blank" rel="noopener nofollow">Why is it So Hard to Respond to Positive Comments</a></li>
    <li data-line="79" dir="auto"><a data-href="How I Use Analytics With My Indie Projects" href="https://untested.sonnet.io/How+I+Use+Analytics+With+My+Indie+Projects" class="internal-link" target="_blank" rel="noopener nofollow">How I Use Analytics With My Indie Projects</a></li>
    <li data-line="80" dir="auto"><a data-href="Say Hi" href="https://untested.sonnet.io/Say+Hi" class="internal-link" target="_blank" rel="noopener nofollow">Say Hi</a></li>
    <li data-line="81" dir="auto"><a data-href="Bootleg T-Shirts - December Batch" href="https://untested.sonnet.io/Bootleg+T-Shirts+-+December+Batch" class="internal-link" target="_blank" rel="noopener nofollow">Bootleg T-Shirts - December Batch</a></li>
    <li data-line="82" dir="auto"><a data-tooltip-position="top" aria-label="52" data-href="52" href="https://untested.sonnet.io/TIL/weekly/52" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #12</a></li>
    <li data-line="83" dir="auto"><a data-href="Zhoozh" href="https://untested.sonnet.io/Zhoozh" class="internal-link" target="_blank" rel="noopener nofollow">Zhoozh</a></li>
    <li data-line="84" dir="auto"><a data-href="TouchDesigner (and Mr Noto, the Talking Ball)" href="https://untested.sonnet.io/TouchDesigner+(and+Mr+Noto%2C+the+Talking+Ball)" class="internal-link" target="_blank" rel="noopener nofollow">TouchDesigner (and Mr Noto, the Talking Ball)</a></li>
    <li data-line="85" dir="auto"><a data-href="New Week" href="https://untested.sonnet.io/New+Week" class="internal-link" target="_blank" rel="noopener nofollow">New Week</a></li>
    <li data-line="86" dir="auto"><a data-href="Summarise My Weekly Notes (With Llamas)" href="https://untested.sonnet.io/Summarise+My+Weekly+Notes+(With+Llamas)" class="internal-link" target="_blank" rel="noopener nofollow">Summarise My Weekly Notes (With Llamas)</a></li>
    <li data-line="87" dir="auto"><a data-tooltip-position="top" aria-label="53" data-href="53" href="https://untested.sonnet.io/TIL/weekly/53" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #13</a></li>
    <li data-line="88" dir="auto"><a data-href="Jeremy Bent-ham" href="https://untested.sonnet.io/Jeremy+Bent-ham" class="internal-link" target="_blank" rel="noopener nofollow">Jeremy Bent-ham</a></li>
    <li data-line="89" dir="auto"><a data-href="Talk to the Blog" href="https://untested.sonnet.io/Talk+to+the+Blog" class="internal-link" target="_blank" rel="noopener nofollow">Talk to the Blog</a></li>
    <li data-line="90" dir="auto"><a data-href="Spikes" href="https://untested.sonnet.io/Spikes" class="internal-link" target="_blank" rel="noopener nofollow">Spikes</a></li>
    <li data-line="91" dir="auto"><a data-href="Tip of the Tongue and Handmade Software" href="https://untested.sonnet.io/Tip+of+the+Tongue+and+Handmade+Software" class="internal-link" target="_blank" rel="noopener nofollow">Tip of the Tongue and Handmade Software</a></li>
    <li data-line="92" dir="auto"><a data-tooltip-position="top" aria-label="54" data-href="54" href="https://untested.sonnet.io/TIL/weekly/54" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #14</a></li>
    <li data-line="93" dir="auto"><a data-href="2-2-2 Project Scoping Technique" href="https://untested.sonnet.io/2-2-2+Project+Scoping+Technique" class="internal-link" target="_blank" rel="noopener nofollow">2-2-2 Project Scoping Technique</a></li>
    <li data-line="94" dir="auto"><a data-href="Kill your darlings, their bones are the best fertiliser" href="https://untested.sonnet.io/Kill+your+darlings%2C+their+bones+are+the+best+fertiliser" class="internal-link" target="_blank" rel="noopener nofollow">Kill your darlings, their bones are the best fertiliser</a></li>
    <li data-line="95" dir="auto"><a data-tooltip-position="top" aria-label="55" data-href="55" href="https://untested.sonnet.io/TIL/weekly/55" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #15</a></li>
    <li data-line="96" dir="auto"><a data-href="Aye-aye" href="https://untested.sonnet.io/Aye-aye" class="internal-link" target="_blank" rel="noopener nofollow">Aye-aye</a></li>
    <li data-line="97" dir="auto"><a data-href="Fig" href="https://untested.sonnet.io/Fig" class="internal-link" target="_blank" rel="noopener nofollow">Fig</a></li>
    <li data-line="98" dir="auto"><a data-href="Fig Tree Brushes" href="https://untested.sonnet.io/Fig+Tree+Brushes" class="internal-link" target="_blank" rel="noopener nofollow">Fig Tree Brushes</a></li>
    <li data-line="99" dir="auto"><a data-href="Two Minute Week" href="https://untested.sonnet.io/Two+Minute+Week" class="internal-link" target="_blank" rel="noopener nofollow">Two Minute Week</a></li>
    <li data-line="100" dir="auto"><a data-tooltip-position="top" aria-label="56" data-href="56" href="https://untested.sonnet.io/56" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #16</a></li>
    <li data-line="101" dir="auto"><a data-href="Sandboxes, Games, and Play" href="https://untested.sonnet.io/Sandboxes%2C+Games%2C+and+Play" class="internal-link" target="_blank" rel="noopener nofollow">Sandboxes, Games, and Play</a></li>
    <li data-line="102" dir="auto"><a data-tooltip-position="top" aria-label="57" data-href="57" href="https://untested.sonnet.io/TIL/weekly/57" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #17</a></li>
    <li data-line="103" dir="auto"><a data-href="Defaults Matter, Don't Assume Consent" href="https://untested.sonnet.io/Defaults+Matter%2C+Don't+Assume+Consent" class="internal-link" target="_blank" rel="noopener nofollow">Defaults Matter, Don't Assume Consent</a></li>
    <li data-line="104" dir="auto"><a data-tooltip-position="top" aria-label="58" data-href="58" href="https://untested.sonnet.io/TIL/weekly/58" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #18</a></li>
    <li data-line="105" dir="auto"><a data-tooltip-position="top" aria-label="Disclaimer" data-href="Disclaimer" href="https://untested.sonnet.io/Disclaimer" class="internal-link" target="_blank" rel="noopener nofollow">Disclaimer!</a></li>
    <li data-line="106" dir="auto"><a data-href="LLM-powered Tools I'm Actually Using" href="https://untested.sonnet.io/LLM-powered+Tools+I'm+Actually+Using" class="internal-link" target="_blank" rel="noopener nofollow">LLM-powered Tools I'm Actually Using</a></li>
    <li data-line="107" dir="auto"><a data-tooltip-position="top" aria-label="59" data-href="59" href="https://untested.sonnet.io/TIL/weekly/59" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #17</a></li>
    <li data-line="108" dir="auto"><a data-tooltip-position="top" aria-label="Adventures of the Bun-man" data-href="Adventures of the Bun-man" href="https://untested.sonnet.io/Adventures+of+the+Bun-man" class="internal-link" target="_blank" rel="noopener nofollow">cp .env.example &gt; .env (Adventures of the Bun-man)</a></li>
    <li data-line="109" dir="auto"><a data-href="Just Some Innocent Gradient Fun" href="https://untested.sonnet.io/Just+Some+Innocent+Gradient+Fun" class="internal-link" target="_blank" rel="noopener nofollow">Just Some Innocent Gradient Fun</a></li>
    <li data-line="110" dir="auto"><a data-tooltip-position="top" aria-label="60" data-href="60" href="https://untested.sonnet.io/TIL/weekly/60" class="internal-link" target="_blank" rel="noopener nofollow">Weekly Notes #18: 111!</a></li>
    <li data-line="111" dir="auto"><a data-href="112" href="https://untested.sonnet.io/112" class="internal-link" target="_blank" rel="noopener nofollow">112</a></li>
    </ol>
`;

import { load } from "cheerio";
import { slugify } from "./build/slugify.js";
import path from "path";
const save = async (obj) => {
  // Write the JSON string to redirects.json
  try {
    await fs.writeFile("redirects.json", JSON.stringify(obj, null, 2), "utf8");
    console.log("Successfully wrote redirects to redirects.json");
  } catch (err) {
    console.error("Error writing to redirects.json:", err);
  }
};
// Load the HTML content
const $ = load(input);

// Extract all hrefs into an array
const hrefs = $("a")
  .map((_, element) => $(element).attr("href"))
  .get();

const slugifyPath = (pathString) => {
  const pathTrimmed = pathString.replace(/\+/g, " ");
  const pathParts = pathTrimmed.split("/");
  const pathPartsSlugified = pathParts
    .map((part) => decodeURIComponent(part))
    .map((part) => slugify(part));

  const joined = path.join(...pathPartsSlugified);
  return joined.endsWith("/") ? joined : `${joined}/`;
};

const destinationPrefix = "/notes";
const destinationPrefixHost = `https://new.untested.sonnet.io`;

let updatedLinks = hrefs.map((href) => {
  const source = href.replace("https://untested.sonnet.io/", "");
  const destination = slugifyPath(source);
  return {
    source: `/${source}`,
    destination: `${destinationPrefix}/${destination}`,
    permanent: true,
  };
});

import { promises as fs } from "fs";
// Vercel uses path-to-regexp for redirects, so we need to escape the regex chars
const escapeRegexChars = (str) => str.replace(/[-^$*+?.()|[\]{}]/g, "\\$&");

const escapeRedirectPaths = (_) => ({
  ..._,
  source: escapeRegexChars(_.source),
});
const oldRedirects = [
  {
    source: "/Physical+uncolouring+book",
    destination:
      "https://new.untested.sonnet.io/notes/physical-uncolouring-book/",
    permanent: true,
  },
  {
    source: "/Physical+uncolouring+book",
    destination:
      "https://new.untested.sonnet.io/notes/physical-uncolouring-book/",
    permanent: true,
  },
  {
    source: "/posts/001",
    destination: "/111",
    permanent: true,
  },
  {
    source: "/posts/002",
    destination: "/Visual+Snapshot+Tests%2C+Cheap+Bastard+Edition%E2%84%A2",
    permanent: true,
  },
  {
    source: "/posts/003",
    destination: "/Instead+or+writing+a+comment%2C+write+a+post+and+link+it",
    permanent: true,
  },
  {
    source: "/posts/004",
    destination: "/How+to+draw+a+Janusz",
    permanent: true,
  },
  {
    source: "/posts/005",
    destination: "/Physical+uncolouring+book",
    permanent: true,
  },
  {
    source: "/posts/006",
    destination: "/Dog+mode",
    permanent: true,
  },
  {
    source: "/posts/007",
    destination: "/%22I+understand%22",
    permanent: true,
  },
  {
    source: "/posts/008",
    destination: "/Projects+and+apps+I+built+for+my+own+well-being",
    permanent: true,
  },
  {
    source: "/posts/009",
    destination: "/The+modern+Web+has+lost+the+User+Agent",
    permanent: true,
  },
  {
    source: "/posts/010",
    destination: "/retrospective.png",
    permanent: true,
  },

  {
    source: "/posts/001/",
    destination: "/111",
    permanent: true,
  },
  {
    source: "/posts/002/",
    destination: "/Visual+Snapshot+Tests%2C+Cheap+Bastard+Edition%E2%84%A2",
    permanent: true,
  },
  {
    source: "/posts/003/",
    destination: "/Instead+or+writing+a+comment%2C+write+a+post+and+link+it",
    permanent: true,
  },
  {
    source: "/posts/004/",
    destination: "/How+to+draw+a+Janusz",
    permanent: true,
  },
  {
    source: "/posts/005/",
    destination: "/Physical+uncolouring+book",
    permanent: true,
  },
  {
    source: "/posts/006/",
    destination: "/Dog+mode",
    permanent: true,
  },
  {
    source: "/posts/007/",
    destination: "/%22I+understand%22",
    permanent: true,
  },
  {
    source: "/posts/008/",
    destination: "/Projects+and+apps+I+built+for+my+own+well-being",
    permanent: true,
  },
  {
    source: "/posts/009/",
    destination: "/The+modern+Web+has+lost+the+User+Agent",
    permanent: true,
  },
  {
    source: "/posts/010/",
    destination: "/retrospective.png",
    permanent: true,
  },
];

const updatedLinksPathRegexFriendly = updatedLinks.map(escapeRedirectPaths);

const allRedirects = [...oldRedirects, ...updatedLinksPathRegexFriendly];
await save(allRedirects);

const broken = await Promise.all(
  [...oldRedirects, ...updatedLinks].map(async (link) => {
    const absoluteUrl = `${destinationPrefixHost}${link.source}`;
    const res = await fetch(absoluteUrl);
    return [link, res.status];
  }),
);
console.log(
  broken
    .filter(([_, status]) => status !== 200)
    .map(([{ source }, status]) => `${source} -> ${status}`),
);
// console.log(updatedLinks.slice(0, 3));

const live = await Promise.all(
  [...oldRedirects, ...updatedLinks].map(async (link) => {
    const absoluteSrcUrl = `${destinationPrefixHost}${link.source}`;
    const srcRes = await fetch(absoluteSrcUrl);
    const srcText = await srcRes.text();
    const srcTitle = load(srcText)("h1").text();
    const srcTime = load(srcText)("time").text();
    const absoluteDestUrl = link.destination.startsWith("http")
      ? link.destination
      : `${destinationPrefixHost}${link.destination}`;
    console.log(absoluteSrcUrl, absoluteDestUrl);
    const destRes = await fetch(absoluteDestUrl);

    const destText = await destRes.text();
    const destTitle = load(destText)("h1").text();
    const destTime = load(destText)("time").text();

    return [link, srcTitle, srcTime, destTitle, destTime];
  }),
);

save(
  live.map(([link, srcTitle, srcTime, destTitle, destTime]) => ({
    ...link,
    srcTitle,
    srcTime,
    destTitle,
    destTime,
  })),
);
