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
