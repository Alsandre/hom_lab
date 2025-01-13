const tl = gsap.timeline({ repeat: -1 }, "asda");

tl.to(".el", {
  rotate: 180,
  borderRadius: "50%",
  duration: 1.5,
  ease: "none",
});
tl.to(".el", {
  rotate: "+=180",
  borderRadius: "0",
  duration: 1.5,
  ease: "none",
});

const PLAY = document.querySelector(".play");
const PAUSE = document.querySelector(".pause");
const RESTART = document.querySelector(".restart");
const REVERSE = document.querySelector(".reverse");
const TIMER = document.querySelector(".timer");
const SECOND = document.querySelector(".second");
const MILLISECOND = document.querySelector(".millisecond");
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

  SECOND.innerHTML = second;
  MILLISECOND.innerHTML = millisecond;
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
