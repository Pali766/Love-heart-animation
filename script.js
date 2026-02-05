const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pulse = 0;
let phase = 0;

const particles = [];
const heartParticles = [];

// ---------- I LOVE YOU részecskék ----------

// Szöveg kirajzolása részecskékhez
const text = "I LOVE YOU";
ctx.fillStyle = "white";
ctx.font = "bold 100px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(text, canvas.width/2, canvas.height/2);

// Képadatok
const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

// Részecskék létrehozása a szöveghez
for (let y = 0; y < canvas.height; y += 6){
  for (let x = 0; x < canvas.width; x += 6){
    const i = (y*canvas.width + x)*4;
    if(imageData.data[i+3] > 150){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        tx: x,
        ty: y
      });
    }
  }
}

// Clear canvas a szívhez
ctx.clearRect(0,0,canvas.width,canvas.height);

// ---------- 3D szív részecskék ----------

// Szív 3D alakja paraméteresen
function heartShape3D(u, v){
  const x = 16 * Math.pow(Math.sin(u),3);
  const y = 13 * Math.cos(u) - 5 * Math.cos(2*u) - 2 * Math.cos(3*u) - Math.cos(4*u);
  const z = 8 * Math.sin(v);
  return {x,y,z};
}

// Szív részecskék létrehozása
for(let u = 0; u < Math.PI*2; u += 0.1){
  for(let v = -Math.PI/2; v < Math.PI/2; v += 0.1){
    const p = heartShape3D(u,v);
    heartParticles.push(p);
  }
}

// 3D → 2D vetítés
function project3D(p){
  const scale = 12 + 4*Math.sin(pulse); // pulzáló méret
  const perspective = 200 / (200 + p.z);
  const screenX = canvas.width/2 + p.x*scale*perspective;
  const screenY = canvas.height/2 - p.y*scale*perspective;
  return {screenX, screenY};
}

// ---------- Animáció ----------
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pulse += 0.05; // pulzus

  // Betűk részecskéi
  ctx.fillStyle = "white";
  particles.forEach(p => {
    p.x += (p.tx - p.x)*0.05;
    p.y += (p.ty - p.y)*0.05;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
  });

  // 3D szív részecskéi
  ctx.fillStyle = "#ff3366";
  heartParticles.forEach(p=>{
    const {screenX, screenY} = project3D(p);
    ctx.beginPath();
    ctx.arc(screenX, screenY, 2, 0, Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

// Resize kezelés
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Inicializálás
animate();
