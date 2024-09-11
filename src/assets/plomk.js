const makePlayer = async (src) => {
  let source = null;
  const audioContext = new window.AudioContext();
  const response = await fetch(src);
  const arrayBuffer = await response.arrayBuffer();
  const audioData = await audioContext.decodeAudioData(arrayBuffer);

  source = audioContext.createBufferSource();
  source.buffer = audioData;

  let hasPlayed = false;

  // Connect the source to the context's destination (the speakers)
  source.connect(audioContext.destination);

  const play = () => {
    if (!source) return;
    if (hasPlayed) {
      source.stop();
      source.disconnect();
    }

    source = audioContext.createBufferSource();
    source.buffer = audioData;
    source.connect(audioContext.destination);
    source.start(0, 0);
    hasPlayed = true;
  };

  const dispose = () => {
    if (!source) return;
    // don't stop the buffer if it hasn't started yet
    if (source.context.currentTime === 0) return;

    source.stop();
    source.disconnect();
  };

  return { play, dispose };
};

export const initPlomk = async () => {
  console.log("Plomk: Initializing");

  if ("sonnet::plomk::initialised" in window) {
    console.log("Plomk: Already initialised");
    return;
  }
  window["sonnet::plomk::initialised"] = true;

  console.log("Plomk: Creating audio element");
  const player = await makePlayer("/assets/sfx/click.mp3");

  async function plomkNow() {
    console.log("Plomk: Playing");
    player.play();
  }

  const onInteract = (e) => {
    const target = e.target;
    if (!target) return;
    const isPlomkable =
      target.matches("a, button, select") ||
      target.closest("a, button, select");

    if (!isPlomkable) return;

    plomkNow();
  };

  document.addEventListener("pointerdown", onInteract, { passive: true });
};
