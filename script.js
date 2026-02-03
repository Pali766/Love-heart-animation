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
  for(let x=0;x<canvas.width;x+=6))
