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
    this.imgPosition = options.imgPosition;
    this.intervalRolling = undefined;
    this.startPosition = 0;
  }
  moveDown() {
    this.positionY += this.speed;
    this.startRolling();
  }
  startRolling() {
    if (this.intervalRolling === undefined) {
      this.startPosition = this.imgPosition.dx;
      this.intervalRolling = setInterval(this._rollPresent.bind(this), 110);
    }
  }
  _rollPresent() {
    if (this.imgPosition.dx + this.imgPosition.dw > this.startPosition + 308) {
      this.imgPosition.dx = this.startPosition;
    } else {
      this.imgPosition.dx += this.imgPosition.dw;
    }
  }
}
