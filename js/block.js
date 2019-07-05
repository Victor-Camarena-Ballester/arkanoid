class Block {
  constructor(
    positionX,
    positionY,
    width,
    height,
    strength,
    divScore,
    present
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.strength = strength;
    this.divScore = divScore;
    this.present = present;
  }
  restStrength() {
    this.strength -= 1;
  }
  sumScore() {
    this.divScore.innerText = parseInt(this.divScore.innerText) + 1;
  }
}
