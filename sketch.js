var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,swordImage;
var fruit, fruitImage;
var fruit2, fruit2Image;
var fruit3, fruit3Image
var mango,mangoImage;
var monster, monsterImage;
var fruit1Group,EnemyGroup,fruit2Group, fruit3Group, mangoGroup;
var score=0;

var gameOver;
var knifeSwooshSound, gameoverSound;


function preload(){
  swordImage= loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  monsterImage= loadImage("alien1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  mangoImage=loadImage("fruit4.png")
  
  GameOverImg=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 400);
  
  sword = createSprite(50,180,20,50);
  
  sword.addImage("running", swordImage);
  sword.scale = 0.5;
  
  gameOver = createSprite(300,200);
  gameOver.addImage(GameOverImg);
 
  gameOver.scale = 2;

  gameOver.visible = false;

  
  fruit1Group=createGroup();
  fruit2Group=createGroup();
  fruit3Group=createGroup();
  mangoGroup=createGroup();
  EnemyGroup=createGroup();
  
  position = Math.round(random(1,2));
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("lightBlue");
  text("Score:"+score,500,50);
  
  sword.y= World.mouseY;
  sword.x= World.mouseX;
 
  if(fruit1Group.isTouching(sword)){
    fruit1Group.destroyEach();
    
    knifeSwooshSound.play();
    score=score+2;
  }
  if(fruit2Group.isTouching(sword)){
    fruit2Group.destroyEach();
    
    knifeSwooshSound.play();
    score=score+2;
  }
  if(fruit3Group.isTouching(sword)){
    fruit3Group.destroyEach();
    
    knifeSwooshSound.play();
    score=score+2;
  }
if(mangoGroup.isTouching(sword)){
  mangoGroup.destroyEach();
  
  knifeSwooshSound.play();
  score=score+2;
}  
  if(EnemyGroup.isTouching(sword)){
    gameoverSound.play();
    
    if(score===10){
      EnemyGroup.VelocityX= EnemyGroup.VelocityX - 3
    }
  }
  spawnfruits1();
  spawnfruits2();
  spawnfruits3();
  spawnmangoes();
  spawnEnemy();
    
    if(EnemyGroup.isTouching(sword)){
        gameState = END;
    }
  
  if (gameState === END) {
    gameOver.visible = true;
  
    //set velocity of each game object to 0
    fruit1Group.setVelocityXEach(0);
    fruit2Group.setVelocityXEach(0);
    fruit3Group.setVelocityXEach(0);
    mangoGroup.setVelocityXEach(0);
    EnemyGroup.setVelocityXEach(0);
  
    fruit1Group.destroyEach();
    fruit2Group.destroyEach();
    fruit3Group.destroyEach();
    mangoGroup.destroyEach();
    EnemyGroup.destroyEach();
    
  }
  
  
  drawSprites();
}

function spawnfruits1() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var fruit1 = createSprite(600,120,40,10);
    fruit1.y = Math.round(random(80,120));
    fruit1.addImage("fa",fruit1Image);
    fruit1.scale = 0.2;
    fruit1.velocityX = -3;
    fruit1.y=Math.round(random(1,100));
    
     //assign lifetime to the variable
    fruit1.lifetime = 200;
    
    //adjust the depth
    fruit1.depth = sword.depth;
    sword.depth = sword.depth + 1;
    
    //add each cloud to the group
    fruit1Group.add(fruit1);
  }
  
}

function spawnfruits2() {
  if(frameCount % 60 === 0) {
    var fruit2 = createSprite(600,45,10,40);         
    fruit2.addImage("fi",fruit2Image);
    fruit2.velocityX = -2;
    fruit2.scale=0.2;
    fruit2.y=Math.round(random(1,200));
    
    fruit2.lifetime = 300;
    
    fruit2Group.add(fruit2);
  }
}
function spawnfruits3(){
  if(frameCount % 80 === 0) {
    var fruit3 = createSprite(600,65,10,40);         
    fruit3.addImage("fm",fruit3Image);
    fruit3.velocityX = -5;
    fruit3.scale=0.2;
    fruit3.lifetime = 300;
    fruit3.y=Math.round(random(300,350));
    
    fruit3Group.add(fruit3);
  }
}
function spawnmangoes(){
  if(frameCount % 80 === 0) {
    var mango = createSprite(600,165,10,40);         
    mango.addImage("mi",mangoImage);
    mango.scale=0.1;
    mango.velocityX = (7+(score/4));
    mango.lifetime = 300;
    mango.y=Math.round(random(200,400));
    
    mangoGroup.add(mango);
  }
}
function spawnEnemy(){
  if(frameCount % 90 === 0) {
    var monster = createSprite(600,165,10,40);         
    monster.addImage("mt",monsterImage);
    monster.scale=1;
    monster.velocityX =-(8+(score/10));
    monster.lifetime = 300;
    monster.y=Math.round(random(1,400));
    
    EnemyGroup.add(monster);
  }
}
