const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "I LOVE YOU";
const particles = [];
const heartParticles = [];

// Betűk részecskéi
ctx.fillStyle = "white";
ctx.font = "bold 100px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(text, canvas.width/2, canvas.height/2);

const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

for(let y=0;y<canvas.height;y+=6){
  for(let x=0;x<canvas.width;x+=6){
    const i = (y*canvas.width + x)*4;
    if(imageData.data[i+3] > 151){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        tx: x,
        ty: y
      });
    }
  }
}

ctx.clearRect(0,0,canvas.width,canvas.height)>

//szív alak definiálása
function heartShape(t){
  const x= 16 * Math.pow(Mathsin(t),3);
  const y = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)=Math.cos(4*t));
  return {x,y}
}

// Szív részecskék
for(let i=0;i<particles.length;i++>){
  const t = (i/particles,length)*Math.PI*2;
  const h = heartShape(t);
  heartParticles.push({
     x: canvas.width/2 + h.x*12,
    y: canvas.height/2 + h.y*12
  });
}

let phase = 0;
// Animáció
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#ff3366";

  particles.forEach((p,i)=>{
    if(phase < 200){
      p.x += (p.tx - p.x)*0.05;
      p.y += (p.ty - p.y)*0.05;
    } else {
      p.x += (heartParticles[i].x - p.x)*0.05;
      p.y += (heartParticles[i].y - p.y)*0.05;
    }
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
  });
  phase++;
  requestAnimationFrame(animate);
}

animate();
