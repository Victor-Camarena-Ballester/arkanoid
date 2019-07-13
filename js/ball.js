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
    if (this.speed > 3) {
      this.speed -= 1;
    }
  }
  get color() {
    if (this.speed > -1 && this.speed < 4) {
      return "#FFF301";
    } else if (this.speed > 3 && this.speed < 5) {
      return "#FFBD00";
    } else if (this.speed > 4 && this.speed < 8) {
      return "#F37F0B";
    } else {
      return "#FF0000";
    }
  }
}
