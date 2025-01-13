const tl = gsap.timeline({ repeat: -1 });

tl.to(".el", {
  rotate: 180,
  borderRadius: "50%",
  duration: 1.5,
  ease: "none",
  onUpdate: () => {
    gsap.to(".el", {
      backgroundColor: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(
        0,
        255
      )},${gsap.utils.random(0, 255)})`,
    });
  },
});
tl.to(".el", {
  rotate: "+=180",
  borderRadius: "0",
  duration: 1.5,
  ease: "none",
  onUpdate: () => {
    gsap.to(".el", {
      backgroundColor: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(
        0,
        255
      )},${gsap.utils.random(0, 255)})`,
    });
  },
});

const PLAY = document.querySelector(".play");
const PAUSE = document.querySelector(".pause");
const RESTART = document.querySelector(".restart");
const REVERSE = document.querySelector(".reverse");

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
