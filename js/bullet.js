class Bullet {
  constructor(positionX, positionY, width, height) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
  }
  move() {
    this.positionY -= 10;
  }
  get image() {
    return {
      imageUrl: imgSprites,
      imgPosition: { dx: 836, dy: 65, dw: 10, dh: 30 }
    };
  }
}
