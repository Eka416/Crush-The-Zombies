const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine, world

var ground, RWall, LWall, bridge, joinLink, joinPoint
var zombieImg, axeImg, stoneImg, woodImg, bgImg
var stones = []

function preload() {
  axeImg = loadImage("axe.png")
  stoneImg = loadImage("stone.png")
  woodImg = loadImage("wood.png")
  zombieImg = loadImage("zombie.png")
  bgImg = loadImage("background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(width/2,height-10,width,20,"black", true)
  RWall = new Base(width - 50,height/2 + 50,100,100, "yellow", true)
  LWall = new Base(50,height/2 + 50, 100, 100, "yellow", true)
  //stones fall under bridge
  bridge = new Bridge(23,{x:-30, y:height/2})
  joinPoint = new Base(width - 50, height/2 + 10, 40, 20, "black", true)
  Composite.add(bridge.body, joinPoint)
  joinLink = new Link(bridge,joinPoint)
  for (var i = 0; i <= 8; i++) {
    var x = random(300,width-300)
    var y = random(-10,140)
    var stone = new Stone(x,y,80,80)
    stones.push(stone)
  }
}

function draw() {
  background(51);
  Engine.update(engine);
  ground.display()
  bridge.show()
  RWall.display()
  LWall.display()
  for (var stone of stones) {
    stone.display()
  }
}
