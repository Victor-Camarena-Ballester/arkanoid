class Present {
  constructor(options) {
    this.positionX = undefined;
    this.positionY = undefined;
    this.width = undefined;
    this.height = undefined;
    this.type = options.type;
    this.speed = options.speed;
    this.color = options.color;
    this.used = false;
    this.imageUrl = options.imageUrl;
  }
  moveDown() {
    this.positionY += this.speed;
  }
}
