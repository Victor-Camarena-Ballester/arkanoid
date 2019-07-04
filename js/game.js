class Game {
  constructor(options) {
    this.gameState = undefined;
    this.ctx = options.ctx;
    this.ship = options.ship;
    this.ball = options.ball;
    this.blocks = [];
  }

  startGame() {
    this._addListeners();
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
    this.ctx.fillStyle = "#2D00FF";
    this.ctx.fill();
    this.ctx.closePath();
  }

  _printBlocks() {
    this.blocks.forEach(block => {
      if (block.strength > 0) {
        this.ctx.beginPath();
        this.ctx.rect(
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );
        this.ctx.fillStyle = "#FF6E00";
        this.ctx.fill();
        this.ctx.closePath();
      }
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

    if (this.ball.directionX === 0) {
      this.ball.directionX = 1;
    }
    if (this.ball.directionY === 0) {
      this.ball.directionY = 1;
    }

    this.ball.positionX -= this.ball.directionX * this.ball.speed;
    this.ball.positionY -= this.ball.directionY * this.ball.speed;
  }

  _refreshScreen() {
    this._cleanScreen();
    this._checkLiveLost();
    this._checkCollisionShip();
    this._checkCollisionsBlocks();
    this._printBall();
    this._printShip();
    this._printBlocks();

    if (this.intervalGame !== undefined) {
      window.requestAnimationFrame(this._refreshScreen.bind(this));
    }
  }

  _createBlocks() {
    let rows = 4;
    let columns = 500 / 100;
    let spaceBetween = 10;
    let divScore = document.getElementById("score");
    for (let i = 0; i < rows; i++) {
      for (let c = 0; c < columns; c++) {
        let blockPositionX = c * 100 + spaceBetween;
        let blockPositionY = i * 30 + spaceBetween;
        let block = new Block(
          blockPositionX,
          blockPositionY,
          100 - spaceBetween,
          30 - spaceBetween,
          divScore
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
  _checkCollisionShip() {
    if (this._rectCircleCollission(this.ball, this.ship) && this.ball.moving) {
      if (this.ball.positionX < this.ship.positionX + this.ship.width / 2) {
        if (this.ball.directionX > 0) {
          this.ball.directionY = -this.ball.directionY;
          this.ball.directionX = -this.ball.directionX;
        } else {
          this.ball.directionY = -this.ball.directionY;
        }
      } else {
        if (this.ball.directionX > 0) {
          this.ball.directionY = -this.ball.directionY;
        } else {
          this.ball.directionX = -this.ball.directionX;
        }
      }
    }
  }

  _checkCollisionsBlocks() {
    let exactPointTopX =
      this.ball.positionX - this.ball.speed - this.ball.radius;
    let exactPointTopY =
      this.ball.positionY - this.ball.speed - this.ball.radius;
    let exactPointBottomX =
      this.ball.positionX + this.ball.speed + this.ball.radius;
    let exactPointBottomY =
      this.ball.positionY + this.ball.speed + this.ball.radius;

    let crashed = false;
    this.blocks.forEach((block, index) => {
      if (block.strength > 0) {
        if (this._rectCircleCollission(this.ball, block) && !crashed) {
          if (this.ball.positionX > block.positionX + block.width / 2) {
            this.ball.directionY = -this.ball.directionY;
          } else {
            this.ball.directionY = -this.ball.directionY;
            this.ball.directionX = -this.ball.directionX;
          }

          crashed = true;
          block.restStrength();
          block.sumScore();
        }
      }
    });
  }

  _checkLiveLost() {}

  _shotBall() {
    this.ball.speed = -2;
    this.ball.moving = true;
  }

  _moveShip(e) {
    if (e.clientX + this.ship.width < 500 && e.clientX > 0) {
      //this.ship.positionY = e.clientY;
      this.ship.positionX = e.clientX;
    }
    if (!this.ball.moving) {
      this.ball.positionX = this.ship.positionX + this.ship.width / 2;
    }
  }

  _rectCircleCollission(circle, rect) {
    let distX = Math.abs(circle.positionX - rect.positionX - rect.width / 2);
    let distY = Math.abs(circle.positionY - rect.positionY - rect.height / 2);

    if (distX > rect.width / 2 + circle.radius) {
      return false;
    }
    if (distY > rect.height / 2 + circle.radius) {
      return false;
    }

    if (distX <= rect.width / 2) {
      return true;
    }
    if (distY <= rect.height / 2) {
      return true;
    }

    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  _addListeners() {
    document.addEventListener("click", this._shotBall.bind(this));
    document.body.addEventListener("mousemove", this._moveShip.bind(this));
  }
}
