class Game {
  constructor(options) {
    this.gameState = undefined;
    this.ctx = options.ctx;
    this.ship = options.ship;
    this.ball = options.ball;
    this.blocks = [];
  }

  startGame() {
    this._createBlocks();
    this.intervalGame = window.requestAnimationFrame(
      this._refreshScreen.bind(this)
    );
  }

  _cleanScreen() {
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, 500, 500);
  }

  _printShip() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.ship.positionX,
      this.ship.positionY,
      this.ship.width,
      this.ship.height
    );
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }

  _printBlocks() {
    this.blocks.forEach(block => {
      this.ctx.beginPath();
      this.ctx.rect(
        block.positionX,
        block.positionY,
        block.width,
        block.height
      );
      this.ctx.fillStyle = "#FF0000";
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  _printBall() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.ball.positionX,
      this.ball.positionY,
      this.ball.radius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();

    this._checkCollisionWalls();

    this.ball.positionX -= this.ball.directionX * this.ball.speed;
    this.ball.positionY -= this.ball.directionY * this.ball.speed;
  }

  _refreshScreen() {
    this._cleanScreen();
    this._printBall();
    this._printShip();
    this._printBlocks();

    if (this.intervalGame !== undefined) {
      window.requestAnimationFrame(this._refreshScreen.bind(this));
    }
  }

  _createBlocks() {
    let rows = 4;
    let columns = 500 / 50;
    let spaceBetween = 10;

    for (let i = 0; i < rows; i++) {
      for (let c = 0; c < columns; c++) {
        let blockPositionX = c * 100 + spaceBetween;
        let blockPositionY = i * 30 + spaceBetween;
        let block = new Block(
          blockPositionX,
          blockPositionY,
          100 - spaceBetween,
          30 - spaceBetween
        );
        this.blocks.push(block);
      }
    }
  }

  _checkCollisionWalls() {
    if (
      this.ball.positionX - this.ball.speed - this.ball.radius < 0 ||
      this.ball.positionX + this.ball.speed + this.ball.radius > 500
    ) {
      this.ball.directionX = -this.ball.directionX;
    }
    if (
      this.ball.positionY - this.ball.speed - this.ball.radius < 0 ||
      this.ball.positionY + this.ball.speed + this.ball.radius > 500
    ) {
      this.ball.directionY = -this.ball.directionY;
    }
  }
  _checkCollisionShip() {}
}
