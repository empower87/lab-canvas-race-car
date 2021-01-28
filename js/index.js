// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     startGame();
//   };

//   function startGame() {}
// };

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = width="500"
canvas.height = height="700"

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

let blocksRandom = [
  {x: 50, y: 0, w: 150, h: 50},
  {x: 50, y: 0, w: 200, h: 50},
  {x: 50, y: 0, w: 250, h: 50},
  {x: 50, y: 0, w: 150, h: 50},
  {x: 50, y: 0, w: 200, h: 50},
  {x: 50, y: 0, w: 250, h: 50}
]
function blockArray(blocks) {
  let ranBloc = blocks[Math.floor(Math.random() * blocks.length)]
  return ranBloc
}

// let r = blocksRandom[Math.floor(Math.random() * blocksRandom.length)]
let blockJam = []


// function dropBlocks(r) {
//   ctx.fillRect(r.x, r.y += 2, r.w, r.h)
// }
class RoadBlock {
  constructor(b) {
    this.b = b
  }
  dropBlocks(b) {
    this.b.y += 2
    //ctx.fillRect(this.b.x, this.b.y += 2, this.b.w, this.b.h)
  }
}

let tester = {x: 0, y: 10, w: 100, h: 100}
let testArray = [tester]

function drawBarrier() {
  for(let i = 0; i < testArray.length; i++) {
    ctx.fillRect(testArray[i].x, testArray[i].y, testArray[i].w, testArray[i].h,)
    testArray[i].y += 5;
  }
}
let counter = 0
let pushed = false

// animate your stuff
function animate() {
  let gameLoop = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(roadImg, road.x, road.y, road.w, road.h)
  honda.draw()
  counter++
  if (counter % 190 === 0) {
    let variablez = blockArray(blocksRandom)
    testArray.push({...variablez})
    pushed = true
  }
  drawBarrier()
}
animate()


// controls
window.onkeydown = function(e) {
  console.log(e.key)
    switch (e.key) {    
      case "ArrowLeft":
        if (honda.x != 0)
          honda.x -= 30;
        else 
          return
        break
      case "ArrowRight":
        if (honda.x + honda.w + 30 < canvas.width)
          honda.x += 30;
        else {
          return;
        }
        break;
      case "ArrowUp":
        if (honda.y - 30 != 0)
          honda.y -= 30;
        else
          return
        break
      case "ArrowDown":
        if (honda.y + honda.h + 30  < canvas.height)
          honda.y += 30;
        else
          return
        break;
    }
}
