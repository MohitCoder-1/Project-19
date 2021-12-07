var gameState = "play";

var ground;

var groundImg;

var invisibleGround;

var desert;

var desertImg;

var human;

var human_running;

var trex;

var trex_running;

var cactusGroup;

var cactus1;

var cactus2;

var cactus3; 

var cactus4;

var cactus5;

var score=0;

var gameOver; gameOverImg;

var restart, restartImg;

function preload(){
  groundImg = loadImage("ground.png")

  humanImg = loadImage("human.png")
  
  trex_running = loadAnimation("trex.png");
  
  cactus1 = loadImage("cactus1.png");
  cactus2 = loadImage("cactus2.png");
  cactus3 = loadImage("cactus3.png");
  cactus4 = loadImage("cactus4.png");
  cactus5 = loadImage("cactus5.png");

  desertImg = loadImage("desert.jpg")
  
  gameOverImg = loadImage("game_over.png");
  
  restartImg = loadImage("restart.png");

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  human = createSprite(200,height-70,20,50);

  human.addImage("human", humanImg);
  human.setCollider('rectangle',100,100,-10,10,10);
  human.scale = 0.4;
  
  trex = createSprite(100,height-70,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.scale = 0.4;
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.visible =false
  
  ground = createSprite(width/2,height,width,2);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  ground.addImage ("ground",groundImg)
  
  gameOver = createSprite(width-400,height-400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width-500,height-500);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  cactusGroup = new Group();
  
  score = 0;
}

function draw() {
  background("#f4cbaa")
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState === "play"){
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(6 + 3*score/100);
    
    //if(keyDown("space") && human.y >= height-175) {
    // human.velocityY = -15;
      
    //}

    if(cactusGroup.isTouching(human)){
      human.velocityY = -20;
    }
    
    human.velocityY = human.velocityY + 2;

    //if(keyDown("space")){
    //  trex.velocityY = -15;
    //}

    if(cactusGroup.isTouching(human)){
      trex.velocityY = -40;
    }

    trex.velocityY = trex.velocityY +3;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    human.collide(invisibleGround);
    human.collide(ground);
  
    trex.collide(invisibleGround);

    
    spawnCactus();
  
    //if(cactusGroup.isTouching(human)){
    //    gameState = end;
    //}
  }
  else if (gameState === end) {
    background = "white"

    gameOver.visible = true;
    restart.visible = true;

    desertImg.visible = false;
    
    ground.velocityX = 0;
    human.velocityX = 0;
    trex.velocityY = 0;
    
    cactusGroup.setVelocityXEach(0);
    
    cactusGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {      
      reset(); 
    }
  }
  
  
  drawSprites();
}



function spawnCactus() {
  if(frameCount % 150 === 0) {
    var cactus = createSprite(width-400,height-95,20,30);
    cactusGroup.scale = 0.1;
    //cactus.setCollider('circle',50,50,45);
    
    cactus.velocityX = -(6 + 3*score/500);
    
    var rand = Math.round(random(1,2,3,4,5));
    switch(rand) {
      case 1: cactus.addImage(cactus1);
              break;
      case 2: cactus.addImage(cactus2);
              break;
      case 3: cactus.addImage(cactus3);
              break;
      case 4: cactus.addImage(cactus4);
              break;
      case 5: cactus.addImage(cactus5);
              break;
      default: break;
    }
             
    cactus.scale = 0.3;
    cactus.lifetime = 300;
    cactusGroup.depth = trex.depth -1;
    //trex.depth = +1;
    cactusGroup.depth = human.depth -1;
    //human.depth = +1;
    cactusGroup.add(cactus);
    cactusGroup.depth = desertImg.depth +1
    human.depth = desertImg.depth +1
    trex.depth = desertImg.depth +1
    gameOver.depth = desertImg.depth +1
    restart.depth = desertImg.depth +1
    ground.depth = desertImg.depth +1
  
    }
 }
  
  
 


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  
  restart.visible = false;
  
  cactusGroup.destroyEach();
  
  score = 0;
  
}

cactus1.scale = 0.1
cactus2.scale = 0.1
cactus3.scale = 0.1
cactus4.scale = 0.1
cactus5.scale = 0.1