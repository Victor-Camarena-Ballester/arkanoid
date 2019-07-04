class Block {
  constructor(positionX, positionY, width, height, divScore) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.strength = 1;
    this.divScore = divScore;
  }
  restStrength() {
    this.strength -= 1;
  }
  sumScore() {
    this.divScore.innerText = parseInt(this.divScore.innerText) + 1;
  }
}
