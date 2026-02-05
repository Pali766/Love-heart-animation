const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pulse = 0;
const particles = [];

// 3D szív létrehozása részecskékből
function createHeart3D() {
  particles.length = 0; // reset

  for (let u = 0; u < Math.PI * 2; u += 0.1) {
    for (let v = -Math.PI/2; v < Math.PI/2; v += 0.1) {
      // 3D szív paraméterek
      const x = 16 * Math.pow(Math.sin(u), 3);
      const y = 13 * Math.cos(u) - 5 * Math.cos(2*u) - 2 * Math.cos(3*u) - Math.cos(4*u);
      const z = 8 * Math.sin(v); // mélység

      particles.push({x, y, z});
    }
  }
}

// 3D → 2D vetítés
function project3D(p) {
  const scale = 12 + 3 * Math.sin(pulse); // pulzáló méret
  const perspective = 200 / (200 + p.z);   // perspektíva hatás
  const screenX = canvas.width/2 + p.x * scale * perspective;
  const screenY = canvas.height/2 - p.y * scale * perspective;
  return {screenX, screenY};
}

// Animáció
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pulse += 0.05; // pulzus sebessége

  ctx.fillStyle = "#ff3366";

  for (const p of particles) {
    const {screenX, screenY} = project3D(p);
    ctx.beginPath();
    ctx.arc(screenX, screenY, 2, 0, Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

// Ablak átméretezés
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createHeart3D();
});

// Inicializálás
createHeart3D();
animate();
