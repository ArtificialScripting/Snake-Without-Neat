class Food {
  constructor() {
    this.x = floor(random(0, (width/2)/scl))*scl;
    this.y = floor(random(0, height/scl))*scl;
  }

  show() {
    fill(200, 0, 100);
    rect(this.x, this.y, scl, scl);
  }
}