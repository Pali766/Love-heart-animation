const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let pulse = 0;

// ---------- Részecskék ----------
const textParticles = [];
const heartParticles = [];

// ---------- 1. “I LOVE YOU” részecskék ----------
const text = "I LOVE YOU";

function createTextParticles() {
  textParticles.length = 0;

  // Canvas-ra kirajzoljuk a szöveget
  ctx.clearRect(0, 0, width, height);
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(text, width / 2, height / 2);

  // Képadatok
  const imageData = ctx.getImageData(0, 0, width, height);
  for (let y = 0; y < height; y += 6) {
    for (let x = 0; x < width; x += 6) {
      const i = (y * width + x) * 4;
      if (imageData.data[i + 3] > 128) {
        textParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          tx: x,
          ty: y
        });
      }
    }
  }
}

// ---------- 2. 3D szív részecskék ----------
function heartShape3D(u, v){
  const x = 16 * Math.pow(Math.sin(u),3);
  const y = 13 * Math.cos(u) - 5*Math.cos(2*u) - 2*Math.cos(3*u) - Math.cos(4*u);
  const z = 8 * Math.sin(v);
  return {x, y, z};
}

function createHeartParticles() {
  heartParticles.length = 0;
  for(let u = 0; u < Math.PI*2; u += 0.1){
    for(let v = -Math.PI/2; v < Math.PI/2; v += 0.1){
      heartParticles.push(heartShape3D(u,v));
    }
  }
}

// 3D → 2D vetítés
function project3D(p){
  const scale = 12 + 6*Math.sin(pulse); // pulzáló méret
  const perspective = 200 / (200 + p.z);
  return {
    screenX: width/2 + p.x*scale*perspective,
    screenY: height/2 - p.y*scale*perspective
  };
}

// ---------- Animáció ----------
function animate(){
  ctx.clearRect(0,0,width,height);
  pulse += 0.05;

  // Text részecskék
  ctx.fillStyle = "white";
  textParticles.forEach(p=>{
    p.x += (p.tx - p.x)*0.05;
    p.y += (p.ty - p.y)*0.05;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
    ctx.fill();
  });

  // Szív részecskék
  ctx.fillStyle = "#ff3366";
  heartParticles.forEach(p=>{
    const {screenX, screenY} = project3D(p);
    ctx.beginPath();
    ctx.arc(screenX, screenY, 2, 0, Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

// ---------- Ablak resize ----------
window.addEventListener("resize", ()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createTextParticles();
  createHeartParticles();
});

// Inicializálás
createTextParticles();
createHeartParticles();
animate();
