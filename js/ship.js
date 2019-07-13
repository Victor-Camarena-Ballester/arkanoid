class Ship {
  constructor(positionX, positionY, width, height, speed) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.lives = 3;
    this.canShot = false;
    this.moveLeft = false;
    this.moveRight = false;
  }

  grow() {
    this.width += 20;
  }
  decrease() {
    this.width -= 20;
  }
  shotOn() {
    this.canShot = true;
  }
  shotOff() {
    this.canShot = false;
  }
  move() {
    if (this.moveLeft) {
      this.positionX -= this.speed;
    }
    if (this.moveRight) {
      this.positionX += this.speed;
    }
  }
}
