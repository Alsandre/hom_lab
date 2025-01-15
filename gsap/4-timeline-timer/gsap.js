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
