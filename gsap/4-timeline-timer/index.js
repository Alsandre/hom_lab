const html = `
<div class="controls">
  <input type="range" id="slider" min="0" max="100" value="0" />
  <div class="actions">
    <button class="control" id="play">Play</button>
    <button class="control" id="pause">Pause</button>
    <button class="control" id="restart">Restart</button>
    <span class="time" draggable="true"></span>
  </div>
</div>`;
document.body.insertAdjacentHTML("beforeend", html);
const styles = `
.controls {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 1%;
  width: 30%;
  max-width: 600px;
  height: 70px;
  padding: 5px;
  padding-top: 20px;
  border-radius: 15px;
  background-color: darkolivegreen;
  border: 1px solid black;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}
.control {
  border-radius: 5px;
  padding: 4px;
  outline: none;
  border: none;
}
.control:hover {
  cursor: pointer;
  box-shadow: 0 0 4px #ccc;
}
input[type="range"] {
  width: 80%;
  max-width: 600px;
  margin: auto;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}`;
const styleTag = document.createElement("style");
styleTag.textContent = styles;

document.head.appendChild(styleTag);

const PLAY = document.querySelector("#play");
const PAUSE = document.querySelector("#pause");
const RESTART = document.querySelector("#restart");
const TIME = document.querySelector(".time");
const SLIDER = document.querySelector("#slider");

PLAY.addEventListener("click", () => {
  gsap.globalTimeline.play();
});
PAUSE.addEventListener("click", () => {
  gsap.globalTimeline.pause();
});
RESTART.addEventListener("click", () => {
  gsap.globalTimeline.restart();
});

const mainTimeline = getMainTimeline();
gsap.ticker.add(() => {
  const time = mainTimeline.time();
  const fraction = time % 1;

  const second = Math.floor(time);
  const millisecond = Math.floor(fraction * 1000)
    .toString()
    .padStart(3, "0");
  TIME.innerHTML = `${second} : ${millisecond}`;
});
gsap.ticker.add(() => {
  const duration = mainTimeline.duration();
  if (mainTimeline.isActive()) {
    SLIDER.value = (mainTimeline.time() * 100) / duration;
  }
});

SLIDER.addEventListener("input", (e) => {
  const timePosition = (3 * SLIDER.value) / 100;
  mainTimeline.seek(timePosition);
});

console.log(gsap.globalTimeline.getChildren());

function getMainTimeline() {
  const topLevelTimelines = gsap.globalTimeline
    .getChildren()
    .filter((tl) => !tl.parent || tl.parent === gsap.globalTimeline);
  if (topLevelTimelines.length > 0) {
    const mainTimeline = topLevelTimelines[0]; // Assuming the first top-level timeline is the main one
    const duration = mainTimeline.duration();
    console.log("Main timeline duration:", duration);
    return mainTimeline;
  } else {
    console.log("No main timeline found.");
    return 0;
  }
}

function toggleGSAPAnimations() {
  if (gsap.globalTimeline.paused()) {
    gsap.globalTimeline.resume();
    console.log("GSAP Animations Resumed");
  } else {
    gsap.globalTimeline.pause();
    console.log("Paused at time:", globalSequence.time());
    console.log("GSAP Animations Paused");
  }
}
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    toggleGSAPAnimations();
  }
});
