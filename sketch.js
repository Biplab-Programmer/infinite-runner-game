var backgroundImg, background;
var blue_pacmanImg, blue_pacman;
var groundImg, ground, groundGroup;
var invisibleBlockGroup, invisibleBlock;
var gameover
var gameState = "play"

function preload(){
  blue_pacmanImg = loadImage("blue_pacman.png");
  groundImg = loadImage("ground.png");
  spookySound = loadSound("spooky.wav");
  gameover = loadImage("gameOver");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  background = createSprite(300,300);
  background.addImage("background",backgroundImg);
  background.velocityY = 1;

  groundGroup = new Group();
  invisibleBlockGroup = new Group();

  blue_pacman = createSprite(200,200,50,50);
  blue_pacman.scale = 0.3;
  blue_pacman.addImage("blue_pacman",blue_pacmanImg);
  
}

function draw() {
  background(200);
  if(gameState === "play"){
    if(background.y > 400){
      background.y = 300
    }

    if(keyDown("left_arrow")){

      blue_pacman.x = blue_pacman.x - 3;
    }

    if(keyDown("right_arrow")){

      blue_pacman.x = blue_pacman.x + 3;
    }

    if(keyDown("space")){

      blue_pacman.velocityY = -5;
    }

    blue_pacman.velocityY = blue_pacman.velocityY + 0.8;

    
    if(invisibleBlockGroup.isTouching(blue_pacman)|| blue_pacman.y>600){

      blue_pacman.destory()
    }
   spawnground()
   drawSprites()
  }
}
if(gameState === "end"){

  stroke("yellow");
  fill("yellow");
  textSize(30);
  gameover.addImage("gameOver",230,250);
}
function spawnground(){

if(frameCount % 240===0){
  var background = createSprite(200,-50);
  background.addImage(backgroundImg);

  var ground = createSprite(200,10);
  ground.addImage(groundImg);

  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = ground.width;
  invisibleBlock.height = 2;

  ground.x = Math.round(random(120,400));
  ground.velocityY = 2;

  invisibleBlock.x = background.x
  invisibleBlock.velocityY = 2
  invisibleBlock.lifetime = 800;
  invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock);

  background.lifetime = 800;
  groundGroup.add(background);

  blue_pacman.depth = ground.depth;
  background.depth = background.depth + 1;

}


}