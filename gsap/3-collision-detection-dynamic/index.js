const marbleCount = 1;
const marbleSizeRange = { min: 40, max: 100 };
const container = document.querySelector(".container");

// const circle1 = document.getElementById("circle1");
// const circle2 = document.getElementById("circle2");

// // Initial positions and velocities
// gsap.set(circle1, { x: 0, y: 200 });
// gsap.set(circle2, { x: 500, y: 200 });

// // Properties
// const circles = [
//   { el: circle1, dx: 3, dy: 3, mass: 2, gravity: 0.1, drag: 0.99 },
//   { el: circle2, dx: -3, dy: 3, mass: 3, gravity: 0.1, drag: 0.99 },
// ];
const marbles = [];
for (let i = 0; i < marbleCount; i++) {
  const marble = document.createElement("div");
  const size = Math.floor(
    gsap.utils.random(marbleSizeRange.min, marbleSizeRange.max)
  );
  const marbleColorRandomizer = gsap.utils.random([
    "blue",
    "green",
    "yellow",
    "red",
  ]);
  // const posX = Math.floor(gsap.utils.random(0, 500));
  // const posY = Math.floor(gsap.utils.random(0, 50));
  let posX, posY;
  let overlap = true;
  while (overlap) {
    posX = Math.floor(gsap.utils.random(10, 500));
    posY = Math.floor(gsap.utils.random(500, 500));

    overlap = false;
    for (let j = 0; j < marbles.length; j++) {
      const other = marbles[j];
      const otherRect = other.el.getBoundingClientRect();
      const currentRect = {
        left: posX,
        top: posY,
        right: posX + size,
        bottom: posY + size,
      };

      if (rectOverlap(currentRect, otherRect)) {
        overlap = true;
        break;
      }
    }
  }
  marble.style.width = `${size}px`;
  marble.style.height = `${size}px`;
  marble.className = "circle";
  //   marble.style.backgroundImage = `url(${marbleColorRandomizer}_marble.png)`;
  //   marble.style.backgroundSize = "100% 100%";
  marble.style.backgroundColor = marbleColorRandomizer;
  marble.innerText = i;
  console.log(posX, posY, i, marbleColorRandomizer);
  gsap.set(marble, { x: posX, y: posY });
  const dX = gsap.utils.random(-3, 3);
  const dY = gsap.utils.random(1, 3);
  const marbleObj = {
    el: marble,
    dx: dX,
    dy: dY,
    mass: 3,
    gravity: 0.4,
    drag: 0.99,
    size,
  };
  marbles.push(marbleObj);
  container.appendChild(marble);
}

const buffer = 0.5;
const collisionBuffer = 0.1;
function animateCircles() {
  const container = document.documentElement;

  marbles.forEach((circle) => {
    const rect = circle.el.getBoundingClientRect();

    // Apply gravity
    console.log("before gravity", circle.dy);
    circle.dy += circle.gravity;
    console.log("after gravity", circle.dy);
    // Apply drag to reduce velocity over time
    circle.dx *= circle.drag;
    console.log("before drag", circle.dy);
    circle.dy *= circle.drag;
    console.log("after drag", circle.dy);
    // Move circles
    console.log("before set", circle.dy);
    gsap.set(circle.el, { x: "+=" + circle.dx, y: "+=" + circle.dy });
    console.log("after set", circle.dy);

    // Screen boundary collision
    if (rect.left <= 0) {
      console.log("left check", circle.dy);
      circle.dx = Math.abs(circle.dx);
      gsap.set(circle.el, { x: buffer });
    }
    if (rect.right >= container.clientWidth) {
      console.log("right check", circle.dy);
      circle.dx = -Math.abs(circle.dx);
      gsap.set(circle.el, {
        x: container.clientWidth - rect.width - buffer,
      });
    }
    if (rect.top <= 0) {
      console.log("top check", circle.dy);
      circle.dy = Math.abs(circle.dy);
      gsap.set(circle.el, { y: buffer });
    }
    if (rect.bottom >= container.clientHeight) {
      console.log("bot check", circle.dy);
      if (Math.abs(circle.dy) < 0.5) {
        console.log("should stop");
        circle.dy = 0;
        gsap.set(circle.el, {
          y: container.clientHeight - rect.height - buffer,
        });
      } else {
        // Only bounce if the marble is moving downwards
        circle.dy = -Math.abs(circle.dy) * 0.8;
        console.log(circle.dy, "inner");
        gsap.set(circle.el, {
          y: container.clientHeight - rect.height - buffer,
        });
      }
    }
  });

  // for (let i = 0; i < marbles.length; i++) {
  //   const current = marbles[i];
  //   for (let j = 0; j < marbles.length; j++) {
  //     const other = marbles[j];
  //     if (j !== i) {
  //       const dx =
  //         current.el.getBoundingClientRect().left +
  //         50 -
  //         (other.el.getBoundingClientRect().left + 50);
  //       const dy =
  //         current.el.getBoundingClientRect().top +
  //         50 -
  //         (other.el.getBoundingClientRect().top + 50);

  //       const distance = Math.sqrt(dx * dx + dy * dy);
  //       const minDistance = (current.size + other.size) / 2 + collisionBuffer;
  //       if (distance < minDistance) {
  //         console.log(minDistance, current.size, other.size);
  //         const angle = Math.atan2(dy, dx);
  //         const sin = Math.sin(angle);
  //         const cos = Math.cos(angle);
  //         // Rotate circle positions
  //         let v1 = {
  //           x: cos * current.dx + sin * current.dy,
  //           y: cos * current.dy - sin * current.dx,
  //         };
  //         let v2 = {
  //           x: cos * other.dx + sin * other.dy,
  //           y: cos * other.dy - sin * other.dx,
  //         };

  //         // Calculate final velocities using 1D elastic collision formula
  //         let v1Final =
  //           ((current.mass - other.mass) * v1.x + 2 * other.mass * v2.x) /
  //           (current.mass + other.mass);
  //         let v2Final =
  //           ((other.mass - current.mass) * v2.x + 2 * current.mass * v1.x) /
  //           (current.mass + other.mass);

  //         v1.x = v1Final;
  //         v2.x = v2Final;

  //         // Rotate back
  //         current.dx = cos * v1.x - sin * v1.y;
  //         current.dy = cos * v1.y + sin * v1.x;
  //         other.dx = cos * v2.x - sin * v2.y;
  //         other.dy = cos * v2.y + sin * v2.x;

  //         // Slight separation to avoid sticking
  //         const overlap = minDistance - distance;
  //         const moveX = (Math.cos(angle) * overlap) / 2;
  //         const moveY = (Math.sin(angle) * overlap) / 2;
  //         gsap.set(circle1, {
  //           x: gsap.getProperty(circle1, "x") + moveX,
  //           y: gsap.getProperty(circle1, "y") + moveY,
  //         });
  //         gsap.set(circle2, {
  //           x: gsap.getProperty(circle2, "x") - moveX,
  //           y: gsap.getProperty(circle2, "y") - moveY,
  //         });
  //       }
  //     }
  //   }
  // }
}

gsap.ticker.add(animateCircles);
gsap.ticker.fps(10);

function rectOverlap(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
