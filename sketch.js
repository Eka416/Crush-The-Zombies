const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine, world

var ground, RWall, LWall, bridge, joinLink, joinPoint, bg, sadImg
var zombieImg, axeImg, stoneImg, woodImg, bgImg, zombie, breakButton
var stones = []

function preload() {
  axeImg = loadImage("axe.png")
  stoneImg = loadImage("stone.png")
  woodImg = loadImage("wood.png")
  zombieImg = loadImage("zombie.png")
  bgImg = loadImage("background.png")
  sadImg = loadImage("6074534e0da542bb86b45a4901745f13.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowHeight)
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(width/2,height-10,width,20,"black", true)
  RWall = new Base(width - 50,height/2 + 50,30,1000, "yellow", true)
  LWall = new Base(50,height/2 + 50, 30, 1000, "yellow", true)
  bridge = new Bridge(23,{x:-30, y:height/2 - 50})
  joinPoint = new Base(width - 50, height/2 + 10, 40, 20, "black", true)
  Composite.add(bridge.body, joinPoint)
  joinLink = new Link(bridge,joinPoint)
  for (var i = 0; i <= 8; i++) {
    var x = random(300,width-300)
    var y = random(-10,140)
    var stone = new Stone(x,y,80,80)
    stones.push(stone)
  }
  zombie = createSprite(width/2, height - 110)
  zombie.addImage("zombie1",zombieImg)
  zombie.addImage("sad",sadImg)
  zombie.scale = 0.1
  zombie.velocityX = 10

  breakButton = createButton("hi")
  breakButton.position(width - 200, height/2 - 50)
  breakButton.class("breakbutton")
  breakButton.mouseClicked(handleButtonPress)
  

  
  
}

function draw() {
  background(51);
  imageMode(CENTER)
  createEdgeSprites()
  image(bgImg,width/2,height/2,width,height);

  Engine.update(engine);
  ground.display()
  bridge.show()
  RWall.display()
  LWall.display()
  if (zombie.x > width) {
    zombie.velocityX = -10
  }
  if (zombie.x < 0) {
    zombie.velocityX = 10
  }
  for (var stone of stones) {
    stone.display()
    var pos = stone.body.position
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
    if (distance <= 50) {
      zombie.velocityX = 0
      Matter.Body.setVelocity(stone.body, {x:10, y:-10})
      zombie.changeImage('sad')
    }
    console.log(pos.y)
    if (pos.y > height - 65) {
      World.remove(engine.world,stone)
      stones.splice(stone)
    }

  }
  drawSprites()
   

}
function handleButtonPress() {
  joinLink.detach()
  setTimeout(() => {
    bridge.break()
  }, 1500);
  console.log("hi")
}

