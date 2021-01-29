let canvas = document.querySelector('canvas')
canvas.width = width="500"
canvas.height = height="650"

let ctx = canvas.getContext('2d')
// x y w h
let roadImg = new Image()
roadImg.src = './images/road.png'
let road = {x: 0, y: 30, w: 500, h: 700, img: roadImg}

let car = new Image()
car.src = './images/car.png'

class Car {
  constructor(x, y, w, h, img) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.img = img
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}
let honda = new Car(60, 450, 100, 150, car)

class RoadBlock {
  constructor() {
    this.x = 50 + Math.floor(Math.random() * 151)
    this.y = 0
    this.w = 150 + Math.floor(Math.random() * 101)
    this.h = 50
  }
  createRect() {
    ctx.fillRect(this.x, this.y += 6, this.w, this.h)
  }
}

let blocksWow = []
setInterval(() => {
  let block = new RoadBlock()
  blocksWow.push(block)
}, 2000)

// barrier collision
let collision = true;
function collisionDetection(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w - 5 > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
      // collision detected!
      console.log('collision!!!')
      cancelAnimationFrame(gameLoop)
      collision = false;
  }
}
function drawScore() {
  ctx.font = "25px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Score: "+score, 8, 20);
}

function motivation() {
  ctx.font = "25px Arial";
  ctx.fillStyle = "green";
  if (collision == true){
    ctx.fillText("Keep It Up!", 185, 20)
  }
  else if (collision == false) {
    ctx.fillStyle = "red"
    ctx.fillText("LOSER!", 185, 20)
  }

}

// animate counters
let counter = 0
let pushed = false
let gameLoop;
// animate your stuff
let score = 0
console.log(typeof score)
function animate() {
  gameLoop = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(roadImg, road.x, road.y, road.w, road.h)
  honda.draw()
  console.log(honda)
  drawScore()
  
  for (block of blocksWow) {
    block.createRect()
  }
  for (block of blocksWow) {
    collisionDetection(honda, block)
    motivation()
    if (block.y > 650) {
      score += 1;
    }

  }
}
animate()


// controls
window.onkeydown = function(e) {
  console.log(e.key)
    switch (e.key) {    
      case "ArrowLeft":
        if (honda.x - 20 > 0)
          honda.x -= 40;
        else 
          return
        break
      case "ArrowRight":
        if (honda.x + honda.w + 20 < canvas.width)
          honda.x += 40;
        else {
          return;
        }
        break;
      case "ArrowUp":
        if (honda.y - 40 != 0)
          honda.y -= 40;
        else
          return
        break
      case "ArrowDown":
        if (honda.y + honda.h + 40  < canvas.height)
          honda.y += 40;
        else
          return
        break;
      case " ":
        if (honda.x + honda.w + 80 < canvas.width)
          honda.x += 80;
        else {
          return;
        }
        break;
    }
}
