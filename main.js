var scl = 20;
var speed = 1;
var snake = [];
var food = [];

function setup() {
  createCanvas(1200, 600).parent("canvas");
  snake[0] = new Snake(0);
  food[i] = new Food();
  frameRate(10);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake[0].changeDir(0, -1);
  }
  else if (keyCode === DOWN_ARROW) {
    snake[0].changeDir(0, 1);
  }
  else if (keyCode === LEFT_ARROW) {
    snake[0].changeDir(-1, 0);
  }
  else if (keyCode === RIGHT_ARROW) {
    snake[0].changeDir(1, 0);
  }
}

function draw() {
  Update();
}

function Update() {
  background(51);
  for (var i=0; i<snake.length; i++) {
    if (!snake[i].dead) {
      snake[i].update();
      snake[i].timeSinceFood++;
      if (snake[i].timeSinceFood >= 500) {
        snake[i].die();
      }
      for (var j=0; j<snake[i].tail.length; j++) {
        if (snake[i].tail[j].x == snake[i].x && snake[i].tail[j].y == snake[i].y) {
          snake[i].die();
          break;
        }
      }
      if (snake[i].x == food[i].x && snake[i].y == food[i].y) {
        snake[i].eat();
        snake[i].timeSinceFood = 0;
        food[i] = new Food();
      }
      snake[i].show();
      food[i].show();
    }
  }
  line((width/2), 0, (width/2), height);
}

function Restart() {
  for (var i=0; i<snake.length; i++) {
    snake[i].dead = false;
    snake[i].x = 0;
    snake[i].y = 0;
    snake[i].timeSinceFood = 0;
    snake[i].tail = [createVector(snake[i].x, snake[i].y),createVector(snake[i].x, snake[i].y),createVector(snake[i].x, snake[i].y),createVector(snake[i].x, snake[i].y)];
    snake[i].dir = createVector(snake[i].x, snake[i].y);
  }
}
