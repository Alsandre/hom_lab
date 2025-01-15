const html = `
<div class="controls">
  <input type="range" id="slider" min="0" max="100" value="0" />
  <div class="actions">
    <button class="control" id="play">Play</button>
    <button class="control" id="pause">Pause</button>
    <button class="control" id="reverse">Reverse</button>
    <button class="control" id="restart">Restart</button>
    <span class="time" draggable="true"></span>
  </div>
</div>`;
document.body.insertAdjacentHTML('beforeend',html)
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
const styleTag = document.createElement('style');
styleTag.textContent = styles;

document.head.appendChild(styleTag);

const PLAY = document.querySelector("#play");
const PAUSE = document.querySelector("#pause");
const RESTART = document.querySelector("#restart");
const REVERSE = document.querySelector("#reverse");
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
REVERSE.addEventListener("click", () => {
  gsap.globalTimeline.reverse();
});

gsap.ticker.add(() => {
  const time = tl.time();
  const fraction = time % 1;

  const second = Math.floor(time);
  const millisecond = Math.floor(fraction * 1000)
    .toString()
    .padStart(3, "0");

  TIME.innerHTML = `${second} : ${millisecond}`;
});
gsap.ticker.add(() => {
  const duration = tl.duration();
  if (tl.isActive()) {
    SLIDER.value = (tl.time() * 100) / duration;
  }
});

SLIDER.addEventListener("input", (e) => {
  const timePosition = (3 * SLIDER.value) / 100;
  tl.seek(timePosition);
});
