var scl = 20;
var speed = 1;
var snake = [];
var food = [];
var agents = 1;
var nodes = [];
var weights = [];

function setup() {
  createCanvas(1200, 600).parent("canvas");
  for (var i=0; i<agents; i++) {
    snake[i] = new Snake(i);
    food[i] = new Food();
  }
  frameRate(10);
}

function isOutOfFrame(value, isX) {
  if (isX) {
    if (value < 0 || value > width/2) {
      return true;
    }
  }
  else {
    if (value < 0 || value > height) {
      return true;
    } 
  }
  return false;
}

function getDirection(type) {
  switch(type) {
    case 0:
      return createVector(0, -1);
      break;
    case 1:
      return createVector(1, -1);
      break;
    case 2:
      return createVector(1, 0);
      break;
    case 3:
      return createVector(1, 1);
      break;
    case 4:
      return createVector(0, 1);
      break;
    case 5:
      return createVector(-1, 1);
      break;
    case 6:
      return createVector(-1, 0);
      break;
    case 7:
      return createVector(-1, -1);
      break;
  }
}

function findDistance(type, direction, headpos, id) {
  switch(type) {
    case 0:
      //Body
      var x = headpos.x;
      var y = headpos.y;
      var counter = 0;
      while (!isOutOfFrame(x, true) && !isOutOfFrame(y, false)) {
        for (var i=0; i<snake[id].tail.length; i++) {
          if (x == snake[id].tail[i].x && y == snake[id].tail[i].y) {
            return counter;
          }
        }
        x+=direction.x*scl;
        y+=direction.y*scl;
        counter++;
      }
      return 0;
      break;
    case 1:
      //Food
      var x = headpos.x;
      var y = headpos.y;
      var counter = 0;
      while (!isOutOfFrame(x, true) && !isOutOfFrame(y, false)) {
        if (x == food[id].x && y == food[id].y) {
          return counter;
        }

        x+=direction.x*scl;
        y+=direction.y*scl;
        counter++;
      }
      return 0;
      break;
    case 2:
      //Wall
      var x = headpos.x;
      var y = headpos.y;
      var counter = 0;
      while (!isOutOfFrame(x, true) && !isOutOfFrame(y, false)) {
        x+=direction.x*scl;
        y+=direction.y*scl;
        counter++;
      }
      return counter;
      break;
  }
}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
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