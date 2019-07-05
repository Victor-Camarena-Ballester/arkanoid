class Ball {
  constructor(positionX, positionY, radius, speed) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.directionX = 1;
    this.directionY = -1;
    this.radius = radius;
    this.speed = speed;
    this.moving = false;
  }

  goFaster() {
    if (this.speed < 8) {
      this.speed += 1;
    }
  }
  goSlower() {
    if (this.speed > 0) {
      this.speed -= 1;
    }
  }
}
