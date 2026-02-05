// --- Canvas beállítás ---
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// --- Szöveg és részecskék ---
const text = "I LOVE YOU";
let particles = [];
let heartParticles = [];

// Betűk kirajzolása részecskékhez
function createTextParticles() {
  particles = [];
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width/2, height/2);

  const imageData = ctx.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y += 6) {
    for (let x = 0; x < width; x += 6) {
      const i = (y*width + x) * 4;
      if (imageData.data[i+3] > 128) { // átlátszóság > 128
        particles.push({
          x: Math.random()*width,
          y: Math.random()*height,
          tx: x,
          ty: y
        });
      }
    }
  }

  ctx.clearRect(0, 0, width, height);
}

// --- Szív definíció ---
function heartShape(t, scale=12, pulse=0) {
  const x = 16 * Math.pow(Math.sin(t), 3) * (1 + pulse);
  const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)) * (1 + pulse);
  return { x: x*scale, y: y*scale };
}

function createHeartParticles() {
  heartParticles = [];
  const len = particles.length;
  for (let i = 0; i < len; i++) {
    const t = (i / len) * Math.PI * 2;
    const h = heartShape(t);
    heartParticles.push({
      x: width/2 + h.x,
      y: height/2 + h.y
    });
  }
}

// --- Resize kezelése ---
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createTextParticles();
  createHeartParticles();
});

// --- Inicializálás ---
createTextParticles();
createHeartParticles();

let phase = 0;

// --- Animáció ---
function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ff3366";

  // pulzáló effekt
  let pulse = Math.sin(phase/20) * 0.1; // ±10% méretváltozás
  const len = particles.length;

  for (let i = 0; i < len; i++) {
    let targetX, targetY;
    if (phase < 200) {
      // először a szöveg felé
      targetX = particles[i].tx;
      targetY = particles[i].ty;
    } else {
      // szív felé pulzálva
      const h = heartShape((i/len)*Math.PI*2, 12, pulse);
      targetX = width/2 + h.x;
      targetY = height/2 + h.y;
    }

    particles[i].x += (targetX - particles[i].x)*0.05;
    particles[i].y += (targetY - particles[i].y)*0.05;

    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI*2);
    ctx.fill();
  }

  phase++;
  requestAnimationFrame(animate);
}

animate();
