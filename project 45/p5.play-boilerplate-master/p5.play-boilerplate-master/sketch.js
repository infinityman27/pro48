var Player;
var border;
var npc,npc1,npc2;
var bullet1,bullet2,bullet3,bulletImage;
var topBorder,topBorder1,bottomBorder;
var level = 0;
var lives = 3;
var obstacle,obstacleGroup;
var distanceTravelled = 0;
var totalNoOfCoins=0,coinsImage,coinsImageFormed,coinsCollected=0,coins;

function preload(){
  bulletImage = loadImage("bullets.jpg");
  coinsImage = loadImage("coinsImage.jpg");
}

function setup() {
  createCanvas(800,700);

  Player = createSprite(100, 650, 50, 50);
  Player.shapeColor = "black";

  topBorder = createSprite(windowWidth/2,0,windowWidth,10);
  topBorder.shapeColor = "black";
  topBorder1 = createSprite(windowWidth/2,0,windowWidth,10);
  topBorder1.shapeColor = "black";
  bottomBorder = createSprite(windowWidth/2,700,windowWidth,10);
  bottomBorder.shapeColor = "black";

  coinsImageFormed = createSprite();
  coinsImageFormed.x = -100000;
  coinsImageFormed.y = -100000;

  buttons = new Buttons();
  obstacleGroup = new Group();
}

function draw() {
  background("cyan"); 

  Player.collide(topBorder);
  Player.collide(topBorder1);
  Player.collide(bottomBorder);
  

  if(level == 0){
    buttons.display();
    fill("black");
    textSize(20);
    text("enter your username here -->",30,365);
    text("<-- click here to play",400,400);
    text("the objective of the game is to get as many coins as possible without touching the",10,40)
    text("obstacle. as the level increase the no. of obstacle will also increase making it harder to",10,80)
    text("play.(also the coin will always be moving)",10,120)
    textSize(70);
    text("GL!",300,600)
  }
  
  if(level == 1){

    distanceTravelled++;

    if(keyDown("SPACE")){
      Player.velocityY -= 3;
      creationOfBullets();
    }else{
      Player.velocityY++
    }

    if(keyDown("D")){
      Player.x += 10;
    }

    if(keyDown("A")){
      Player.x -= 10;
    } 

    fill("black");
    textSize(20);
    text("coins collected --> "+coinsCollected,10,20);
    text("lives left --> "+ lives,10,40)
    text("to reset to og pos press 'E'",10,60)

    coinsPlaced();
    if(Player.collide(coinsImageFormed)){
      coinsImageFormed.x = -100;
      coinsImageFormed.y = -100
      coinsCollected = coinsCollected+1;
      totalNoOfCoins = totalNoOfCoins + 1;
    }
    obstacleCreation();
    if(Player.collide(obstacleGroup,(collided,collider)=>{collider.lifetime=1})){
      lives--;
      level = 2;
    }

    if(keyDown("E")){
      Player.x = 100
      Player.y = 650
    }

    

    drawSprites();

  }
  if(level ==2){
    textSize(40)
    fill("black")
    text("YOU DIED CLICK 'R' TO RESPAWN",50,300)
    if(keyDown("R")){
      level=1;
    }
  }
}

function creationOfBullets(){
  bullet1 = createSprite();
  bullet1.addImage("bullet1",bulletImage);
  bullet1.x = Player.x;
  bullet1.y = Player.y+30;
  bullet1.velocityY +=20;
  bullet1.lifetime = 200;

  bullet2 = createSprite();
  bullet2.addImage("bullet1",bulletImage);
  bullet2.x = Player.x+20;
  bullet2.y = Player.y+30;
  bullet2.velocityY+= 20
  bullet2.lifetime = 200;

  bullet3 = createSprite();
  bullet3.addImage("bullet1",bulletImage);
  bullet3.x = Player.x-20;
  bullet3.y = Player.y+30;
  bullet3.velocityY += 20;
  bullet3.lifetime = 200;
}

function coinsPlaced(){
  if(level == 1){
    if(frameCount%50 == 0 ){
    coinsImageFormed = createSprite();
      coinsImageFormed.addImage("coinsImageFormed",coinsImage);
      coinsImageFormed.height = 50;
      coinsImageFormed.scale = 0.2
      coinsImageFormed.width = 50;
      coinsImageFormed.x = Math.round(random(100,700));
      coinsImageFormed.y = Math.round(random(200,400));
      coinsImageFormed.lifetime = 50;
    }
  }
}

function obstacleCreation(){
  var randx = Math.round(random(200,600))
  var randy = Math.round(random(100,500))
  var randw = Math.round(random(100,10))
  var randh = Math.round(random(100,10))
  if(level==1){
    if(frameCount%200==0){
      obstacle = createSprite(randx,randy,randh,randw)
      obstacle.shapeColor = "blue";
      obstacleGroup.add(obstacle)
    }
  }
}