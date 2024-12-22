const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");

gsap.set(circle1, { x: 0, y: 200 });
gsap.set(circle2, { x: 500, y: 200 });

const speed = 3;
let dx1 = speed,
  dy1 = speed;
let dx2 = -speed,
  dy2 = speed;
const buffer = 2;

function animateCircles() {
  const rect1 = circle1.getBoundingClientRect();
  const rect2 = circle2.getBoundingClientRect();
  const container = document.documentElement;

  // Move circles
    gsap.set(circle1, { x: "+=" + dx1, y: "+=" + dy1 });
    gsap.set(circle2, { x: "+=" + dx2, y: "+=" + dy2 });

  // Screen boundary collision with buffer
  if (rect1.left <= 0) {
    dx1 = Math.abs(dx1);
    gsap.set(circle1, { x: buffer });
  }
  if (rect1.right >= container.clientWidth) {
    dx1 = -Math.abs(dx1);
    gsap.set(circle1, { x: container.clientWidth - rect1.width - buffer });
  }
  if (rect1.top <= 0) {
    dy1 = Math.abs(dy1);
    gsap.set(circle1, { y: buffer });
  }
  if (rect1.bottom >= container.clientHeight) {
    dy1 = -Math.abs(dy1);
    gsap.set(circle1, { y: container.clientHeight - rect1.height - buffer });
  }

  if (rect2.left <= 0) {
    dx2 = Math.abs(dx2);
    gsap.set(circle2, { x: buffer });
  }
  if (rect2.right >= container.clientWidth) {
    dx2 = -Math.abs(dx2);
    gsap.set(circle2, { x: container.clientWidth - rect2.width - buffer });
  }
  if (rect2.top <= 0) {
    dy2 = Math.abs(dy2);
    gsap.set(circle2, { y: buffer });
  }
  if (rect2.bottom >= container.clientHeight) {
    dy2 = -Math.abs(dy2);
    gsap.set(circle2, { y: container.clientHeight - rect2.height - buffer });
  }

  // Circle collision detection with buffer
  const collisionBuffer = 5; // Small buffer to avoid circle sticking on collision

  // Circle collision detection with buffer
  const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
  const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = 100 + collisionBuffer;
  console.log(distance);
  //   if (distance < minDistance) {
  //     const overlap = minDistance - distance;
  //     const angle = Math.atan2(dy, dx);
  //     const moveX = (Math.cos(angle) * overlap) / 2;
  //     const moveY = (Math.sin(angle) * overlap) / 2;

  //     gsap.set(circle1, { x: "+=" + moveX, y: "+=" + moveY });
  //     gsap.set(circle2, { x: "-=" + moveX, y: "-=" + moveY });

  //     dx1 = -dx1;
  //     dy1 = -dy1;
  //     dx2 = -dx2;
  //     dy2 = -dy2;

  //     circle1.style.backgroundColor = "green";
  //     circle2.style.backgroundColor = "green";
  //   } else {
  //     circle1.style.backgroundColor = "red";
  //     circle2.style.backgroundColor = "blue";
  //   }
}

gsap.ticker.add(animateCircles);
gsap.ticker.fps(3)
