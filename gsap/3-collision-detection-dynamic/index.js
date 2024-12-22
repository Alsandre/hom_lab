const marbleCount = 4;
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
  const posX = Math.floor(gsap.utils.random(0, 500));
  const posY = Math.floor(gsap.utils.random(0, 50));
  //   let posX, posY;
  //   let overlap = true;
  //   while (overlap) {
  //     posX = Math.floor(gsap.utils.random(10, 500));
  //     posY = Math.floor(gsap.utils.random(10, 50));

  //     overlap = false;
  //     for (let j = 0; j < marbles.length; j++) {
  //       const other = marbles[j];
  //       const otherRect = other.el.getBoundingClientRect();
  //       const currentRect = {
  //         left: posX,
  //         top: posY,
  //         right: posX + size,
  //         bottom: posY + size,
  //       };

  //       if (rectOverlap(currentRect, otherRect)) {
  //         overlap = true;
  //         break;
  //       }
  //     }
  //   }
  marble.style.width = `${size}px`;
  marble.style.height = `${size}px`;
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
    gravity: 0.5,
    drag: 0.99,
  };
  marbles.push(marbleObj);
  container.appendChild(marble);
}

const buffer = 3;
const collisionBuffer = 5;

function animateCircles() {
  const container = document.documentElement;

  marbles.forEach((circle) => {
    const rect = circle.el.getBoundingClientRect();

    // Apply gravity
    circle.dy += circle.gravity;

    // Apply drag to reduce velocity over time
    circle.dx *= circle.drag;
    circle.dy *= circle.drag;

    // Move circles
    gsap.set(circle.el, { x: "+=" + circle.dx, y: "+=" + circle.dy });

    // Screen boundary collision
    if (rect.left <= 0) {
      circle.dx = Math.abs(circle.dx);
      gsap.set(circle.el, { x: buffer });
    }
    if (rect.right >= container.clientWidth) {
      circle.dx = -Math.abs(circle.dx);
      gsap.set(circle.el, {
        x: container.clientWidth - rect.width - buffer,
      });
    }
    if (rect.top <= 0) {
      circle.dy = Math.abs(circle.dy);
      gsap.set(circle.el, { y: buffer });
    }
    if (rect.bottom >= container.clientHeight) {
      if (Math.abs(circle.dy) < 0.5) {
        circle.dy = 0;
        gsap.set(circle.el, {
          y: container.clientHeight - rect.height - buffer,
        });
      } else {
        if (circle.dy > 0) {
          // Only bounce if the marble is moving downwards
          circle.dy = -Math.abs(circle.dy) * 0.8;
          gsap.set(circle.el, {
            y: container.clientHeight - rect.height - buffer,
          });
        }
      }
    }
  });

  for (let i = 0; i < marbles.length; i++) {
    const current = marbles[i];
    for (let j = 0; j < marbles.length; j++) {
      const other = marbles[j];
      if (j !== i) {
        const dx =
          current.el.getBoundingClientRect().left +
          50 -
          (other.el.getBoundingClientRect().left + 50);
        const dy =
          current.el.getBoundingClientRect().top +
          50 -
          (other.el.getBoundingClientRect().top + 50);

        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 100 + collisionBuffer;

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Rotate circle positions
          let v1 = {
            x: cos * current.dx + sin * current.dy,
            y: cos * current.dy - sin * current.dx,
          };
          let v2 = {
            x: cos * other.dx + sin * other.dy,
            y: cos * other.dy - sin * other.dx,
          };

          // Calculate final velocities using 1D elastic collision formula
          let v1Final =
            ((current.mass - other.mass) * v1.x + 2 * other.mass * v2.x) /
            (current.mass + other.mass);
          let v2Final =
            ((other.mass - current.mass) * v2.x + 2 * current.mass * v1.x) /
            (current.mass + other.mass);

          v1.x = v1Final;
          v2.x = v2Final;

          // Rotate back
          current.dx = cos * v1.x - sin * v1.y;
          current.dy = cos * v1.y + sin * v1.x;
          other.dx = cos * v2.x - sin * v2.y;
          other.dy = cos * v2.y + sin * v2.x;

          // Slight separation to avoid sticking
          const overlap = minDistance - distance;
          const moveX = (Math.cos(angle) * overlap) / 2;
          const moveY = (Math.sin(angle) * overlap) / 2;
          gsap.set(current, { x: "+=" + moveX, y: "+=" + moveY });
          gsap.set(other, { x: "-=" + moveX, y: "-=" + moveY });
        }
      }
    }
  }
  //   // Collision detection between circles
  //   const dx =
  //     circles[0].el.getBoundingClientRect().left +
  //     50 -
  //     (circles[1].el.getBoundingClientRect().left + 50);
  //   const dy =
  //     circles[0].el.getBoundingClientRect().top +
  //     50 -
  //     (circles[1].el.getBoundingClientRect().top + 50);
  //   const distance = Math.sqrt(dx * dx + dy * dy);
  //   const minDistance = 100 + collisionBuffer;

  //   if (distance < minDistance) {
  //     const angle = Math.atan2(dy, dx);
  //     const sin = Math.sin(angle);
  //     const cos = Math.cos(angle);

  //     // Rotate circle positions
  //     let v1 = {
  //       x: cos * circles[0].dx + sin * circles[0].dy,
  //       y: cos * circles[0].dy - sin * circles[0].dx,
  //     };
  //     let v2 = {
  //       x: cos * circles[1].dx + sin * circles[1].dy,
  //       y: cos * circles[1].dy - sin * circles[1].dx,
  //     };

  //     // Calculate final velocities using 1D elastic collision formula
  //     let v1Final =
  //       ((circles[0].mass - circles[1].mass) * v1.x +
  //         2 * circles[1].mass * v2.x) /
  //       (circles[0].mass + circles[1].mass);
  //     let v2Final =
  //       ((circles[1].mass - circles[0].mass) * v2.x +
  //         2 * circles[0].mass * v1.x) /
  //       (circles[0].mass + circles[1].mass);

  //     v1.x = v1Final;
  //     v2.x = v2Final;

  //     // Rotate back
  //     circles[0].dx = cos * v1.x - sin * v1.y;
  //     circles[0].dy = cos * v1.y + sin * v1.x;
  //     circles[1].dx = cos * v2.x - sin * v2.y;
  //     circles[1].dy = cos * v2.y + sin * v2.x;

  //     // Slight separation to avoid sticking
  //     const overlap = minDistance - distance;
  //     const moveX = (Math.cos(angle) * overlap) / 2;
  //     const moveY = (Math.sin(angle) * overlap) / 2;

  //     gsap.set(circle1, { x: "+=" + moveX, y: "+=" + moveY });
  //     gsap.set(circle2, { x: "-=" + moveX, y: "-=" + moveY });
  //   }
}

// gsap.ticker.add(animateCircles);
gsap.ticker.fps(15);

function rectOverlap(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
