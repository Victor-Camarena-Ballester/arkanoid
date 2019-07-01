class Stage {
  constructor(screenWidth, screenHeigth) {
    this.blocks = [];
    this.ship = new Ship(
      screenWidth / 2 - 100 / 2,
      screenHeigth - 10,
      100,
      10,
      7
    );
    this.ball = new ball(this.ship.positionX, this.positionY, 10, 7);
  }

  createBlocks() {}
}
