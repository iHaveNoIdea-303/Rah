var trex, trex_running, trex_collided, cloud_image, obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5, obstacle_6, gameOver_1, gameOver_2, gameOver, restart;
var ground, invisibleGround, groundImage;
var Clouds
var Obstacles
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var highScore = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  cloud_image = loadImage("cloud.png");

  obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");

  groundImage = loadImage("ground2.png")

  gameOver_1 = loadImage("gameOver.png");
  gameOver_2 = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  gameOver = createSprite(300, 100, 10, 10);
  gameOver.addImage(gameOver_1);
  gameOver.visible = false;
  gameOver.scale = 0.5;

  restart = createSprite(300, 125, 10, 10);
  restart.addImage(gameOver_2);
  restart.visible = false;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  Clouds = new Group();
  Obstacles = new Group();
}

function draw() {
  background(245);

  text("Score:" + score, 500, 30);
  
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);
  drawSprites();
  if (gameState == 1) {
    spawnCloud();
    spawnObstacles();
    ground.velocityX = -2;
    if (keyDown("space")) {
      trex.velocityY = -10
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (Obstacles.isTouching(trex)) {
      gameState = 0;
    }
    score = score + Math.round(getFrameRate() / 60);
  } else if (gameState == 0) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    Clouds.setVelocityXEach(0);
    Obstacles.setVelocityXEach(0);
    Clouds.setLifetimeEach(-1);
    Obstacles.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided", trex_collided);
    text("HighScore:" + highScore, 500, 50);
  }
  if (mousePressedOver(restart)) {
    reset();
  }


}

function spawnCloud() {
  if (frameCount % 80 == 0) {
    var cloud = createSprite(650, 25, 10, 10);
    cloud.addImage(cloud_image);
    var rand = Math.round(random(25, 50));
    cloud.y = rand;
    cloud.velocityX = -5;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200;
    Clouds.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 50 == 0) {
    var obstacle = createSprite(650, 170, 10, 10);
    obstacle.velocityX = -5;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle_1);
        break
      case 2:
        obstacle.addImage(obstacle_2);
        break
      case 3:
        obstacle.addImage(obstacle_3);
        break
      case 4:
        obstacle.addImage(obstacle_4);
        break
      case 5:
        obstacle.addImage(obstacle_5);
        break
      case 6:
        obstacle.addImage(obstacle_6);
        break
      default:
        break;
    }
    obstacle.scale = 0.6;
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    obstacle.lifetime = 200;
    Obstacles.add(obstacle);
  }
}

function reset() {
  gameState = 1;
  Obstacles.destroyEach();
  Clouds.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trex_running);
  if (score > highScore) {
    highScore = score;
  }
  score = 0;
}