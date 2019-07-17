class Ship {
  constructor(positionX, positionY, width, height, speed) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.lives = 3;
    this.moveLeft = false;
    this.moveRight = false;
  }

  grow() {
    this.width += 20;
    let audioN = new Audio("music/SFX 9.mp3");
    audioN.play();
  }
  decrease() {
    this.width -= 20;
    let audioN = new Audio("music/SFX 10.mp3");
    audioN.play();
  }
  move() {
    if (this.moveLeft) {
      this.positionX -= this.speed;
    }
    if (this.moveRight) {
      this.positionX += this.speed;
    }
  }
  getBullets() {
    let bullet1 = new Bullet(this.positionX - 5, this.positionY - 15, 5, 10);
    let bullet2 = new Bullet(
      this.positionX + this.width - 10,
      this.positionY - 15,
      5,
      10
    );
    return [bullet1, bullet2];
  }
}
