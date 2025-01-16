const tl = gsap.timeline({ repeat: -1 }, "asda");

gsap.to(".el", {
  rotate: 180,
  borderRadius: "50%",
  duration: 1.5,
  ease: "none",
});
gsap.to(".el", {
  rotate: "+=180",
  borderRadius: "0",
  duration: 1.5,
  ease: "none",
});
const newTl = gsap.timeline();
newTl.to(".el", {
  x: 100,
});

const otherTl = gsap.timeline();
newTl.to(".el", {
  rotate: 100,
});

const somethingElse = () => {
  return gsap.to(".el", {
    opacity: 0.5,
  });
};
const someTl = () => {
  return gsap
    .timeline()
    .to(".el", { opacity: 0.8 })
    .to(".el", { opacity: 0.5 })
    .to(".el", { opacity: 1 });
};

tl.add(newTl).add(otherTl).add(somethingElse()).add(someTl());
