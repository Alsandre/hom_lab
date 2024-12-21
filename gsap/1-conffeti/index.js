const wrapper = document.querySelector(".wrapper");
const colors = ["#d13447", "#ffbf00", "#263672", "#34d1bf", "#a726ca"];
const numConfetti = 200; // More confetti for better effect

function createConfetti() {
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    wrapper.appendChild(confetti);

    // Initial random position in the center
    gsap.set(confetti, {
      x: wrapper.offsetWidth / 2,
      y: wrapper.offsetHeight / 2,
      opacity: 1,
      scale: 0, // Start scaled to 0
    });
  }
}

function explodeConfetti() {
  const confettiElements = document.querySelectorAll(".confetti");

  confettiElements.forEach((confetti) => {
    const angle = Math.random() * 360; // Random angle
    const velocity = Math.random() * 300 + 100; // Random velocity

    gsap.to(confetti, {
      duration: Math.random() * 1 + 0.5, // Random duration
      x: `+=${Math.cos((angle * Math.PI) / 180) * velocity}`,
      y: `+=${Math.sin((angle * Math.PI) / 180) * velocity}`,
      opacity: 1,
      scale: Math.random() * 0.5 + 0.7, // Random final scale
      ease: "power4.in",
      onComplete: () => {
        gsap.set(confetti, {
          scale: 0,
          x: wrapper.offsetWidth / 2,
          y: wrapper.offsetHeight / 2,
          opacity: 1,
        });
      },
    });
  });
}

createConfetti();

// Trigger the explosion on click (or any other event)
wrapper.addEventListener("click", explodeConfetti);

// Explode on load (optional)
// explodeConfetti();
