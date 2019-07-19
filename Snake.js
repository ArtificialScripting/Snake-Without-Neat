class Snake {
  constructor(id) {
    this.x = 300;
    this.y = 300;
    this.dir = createVector(0, 0);
    var tailDuplicate = createVector(this.x,this.y);
    this.tail = [tailDuplicate, tailDuplicate, tailDuplicate, tailDuplicate, tailDuplicate];
    this.id = id;
    this.dead = false;
  }

  show() {
    fill(255);
    rect(this.x, this.y, scl, scl);
    for (var i=0; i<this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }
  update() {
    for (var i=this.tail.length-1; i>0; i--) {
      if (this.tail.length > 1) {
        this.tail[i] = this.tail[i-1];
      }
    }
    if (this.tail.length > 0)
      this.tail[0] = createVector(this.x, this.y);
    this.x += this.dir.x*speed*scl;
    this.y += this.dir.y*speed*scl;
    if (this.x >= width/2 || this.x < 0 || this.y >= height || this.y < 0) {
      this.die();
      Restart();
    }
  }
  changeDir(x, y) {
    this.dir.x = x;
    this.dir.y = y;
  }

  die() {
    this.dead = true;
    Restart();
  }

  eat() {
    if (this.tail.length > 1) {
      this.tail[this.tail.length] = createVector(this.tail[this.tail.length-1].x,this.tail[this.tail.length-1].y);
    }
    else {
      this.tail[this.tail.length] = createVector(this.x,this.y);
    }
  }
}
