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
    this.hasBeenCrashed = false;
  }
  restStrength() {
    this.strength -= 1;
    this.hasBeenCrashed = true;
  }
  sumScore() {
    this.divScore.innerText = parseInt(this.divScore.innerText) + 1;
  }

  get image() {
    if (this.hasBeenCrashed) {
      if (this.strength === 1) {
        return {
          imageUrl: imgSprites,
          imgPosition: { dx: 811, dy: 0, dw: 42, dh: 21 }
        };
      } else {
        return {
          imageUrl: imgSprites,
          imgPosition: { dx: 406, dy: 0, dw: 42, dh: 21 }
        };
      }
    }

    switch (this.strength) {
      case 1:
        return {
          imageUrl: imgSprites,
          imgPosition: { dx: 0, dy: 0, dw: 42, dh: 21 }
        };
      case 2:
        return {
          imageUrl: imgSprites,
          imgPosition: { dx: 115, dy: 38, dw: 42, dh: 21 }
        };
      case 3:
        return {
          imageUrl: imgSprites,
          imgPosition: { dx: 232, dy: 0, dw: 42, dh: 21 }
        };
    }
  }
}
