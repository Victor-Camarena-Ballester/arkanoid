class Game {
  constructor(options) {
    this.gameState = undefined;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.stage = undefined;
    this.presentsInGame = [];
    this.lives = 3;
    this.stageNumber = 1;
    this.refreshTimer = options.refreshTimer;
  }

  _setCurrentStage() {
    let actualStage = stagesArr.find(stage => {
      return stage.stageNum === this.stageNumber;
    });

    this.stage = new Stage(
      this.canvas,
      actualStage.options.rows,
      actualStage.options.columnWidth,
      actualStage.options.speedBall,
      actualStage.options.countDown,
      this.refreshTimer
    );
    this.stage.createStage();
  }

  startGame() {
    this._addListeners();
    this._setCurrentStage();

    this.intervalGame = window.requestAnimationFrame(
      this._refreshScreen.bind(this)
    );
  }

  pauseGame() {
    this.stage.pauseChrono();
    this.intervalGame = undefined;
  }

  reestartGame() {
    this.intervalGame = window.requestAnimationFrame(
      this._refreshScreen.bind(this)
    );
    this.stage.reestartChrono();
  }

  _cleanScreen() {
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _printShip() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.stage.ship.positionX,
      this.stage.ship.positionY,
      this.stage.ship.width,
      this.stage.ship.height
    );
    this.ctx.fillStyle = "#2D00FF";
    this.ctx.fill();
    this.ctx.closePath();
  }

  _printBlocks() {
    this.stage.blocks.forEach(block => {
      if (block.strength > 0) {
        this.ctx.beginPath();
        this.ctx.rect(
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );
        if (block.strength === 3) {
          this.ctx.fillStyle = "#000040";
        } else if (block.strength === 2) {
          this.ctx.fillStyle = "#636363";
        } else {
          this.ctx.fillStyle = "#28AF80";
        }

        this.ctx.fill();
        this.ctx.closePath();
      }
    });
  }

  _printPresents() {
    this.presentsInGame.forEach(present => {
      if (present.type != "n") {
        this.ctx.beginPath();
        this.ctx.rect(
          present.positionX,
          present.positionY,
          present.width,
          present.height
        );
        this.ctx.fillStyle = present.color;
        this.ctx.fill();
        this.ctx.closePath();
        present.moveDown();
      }
    });
  }

  _printBall() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.stage.ball.positionX,
      this.stage.ball.positionY,
      this.stage.ball.radius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();

    if (this.stage.ball.directionX === 0) {
      this.stage.ball.directionX = 1;
    }
    if (this.stage.ball.directionY === 0) {
      this.stage.ball.directionY = 1;
    }

    this.stage.ball.positionX +=
      this.stage.ball.directionX * this.stage.ball.speed;
    this.stage.ball.positionY +=
      this.stage.ball.directionY * this.stage.ball.speed;
  }

  _refreshScreen() {
    this._cleanScreen();
    this._checkAllCollissions();
    this._printBall();
    this._printShip();
    this._printBlocks();
    this._printPresents();

    if (this.intervalGame !== undefined) {
      window.requestAnimationFrame(this._refreshScreen.bind(this));
    }
  }

  _checkAllCollissions() {
    this._checkCollisionWalls();
    this._checkCollisionsBlocks();
    this._checkPresentsGone();
    this._checkCollisionPresents();
    this._checkCollisionShip();
  }

  _checkCollisionWalls() {
    if (
      this.stage.ball.positionX -
        this.stage.ball.speed -
        this.stage.ball.radius <
        0 ||
      this.stage.ball.positionX +
        this.stage.ball.speed +
        this.stage.ball.radius >
        500
    ) {
      this.stage.ball.directionX = -this.stage.ball.directionX;
    }
    if (
      this.stage.ball.positionY -
        this.stage.ball.speed -
        this.stage.ball.radius <
      0
    ) {
      this.stage.ball.directionY = -this.stage.ball.directionY;
    }
    if (this.stage.ball.positionY > this.canvas.height) {
      this.lives -= 1;
      if (this.lives === 0) {
        //GameOver
      } else {
        document.getElementById("lives").innerHTML = this.lives;
        this.stage.createBall();
      }
    }
  }

  _checkCollisionShip() {
    if (
      this._rectCircleCollission(this.stage.ball, this.stage.ship) &&
      this.stage.ball.moving
    ) {
      var ballPos = this.stage.ball.positionX - this.stage.ship.positionX;
      var relativePos = this.stage.ship.width - ballPos;
      var angle = relativePos * (Math.PI / this.stage.ship.width);

      var newVel = Math.cos(angle);
      this.stage.ball.directionY = -this.stage.ball.directionY;
      this.stage.ball.directionX = newVel;
    }
  }

  _checkPresentsGone() {
    if (this.presentsInGame.length === 0) {
      return;
    }

    let indexToDelete = undefined;

    this.presentsInGame.forEach((present, index) => {
      if (present.positionY > this.canvas.height) {
        indexToDelete = index;
      }
    });
    if (indexToDelete != undefined) {
      this.presentsInGame.splice(indexToDelete, 1);
      console.log(this.presentsInGame);
    }
  }

  _checkCollisionPresents() {
    let indexToDelete = undefined;

    this.presentsInGame.forEach((present, index) => {
      if (this._rectRectCollission(present, this.stage.ship) && !present.used) {
        this.stage.givePresentToGame(present);
        present.used = true;
      }
    });
  }

  _checkAllBlocksCrashed() {
    let count = this.stage.blocks.filter(block => {
      return block.strength > 0;
    });

    if (count.length === 0) {
      this.stageNumber += this.stageNumber;
      this._setCurrentStage();
    }
  }

  _checkCollisionsBlocks() {
    let exactPointTopX =
      this.stage.ball.positionX -
      this.stage.ball.speed -
      this.stage.ball.radius;
    let exactPointTopY =
      this.stage.ball.positionY -
      this.stage.ball.speed -
      this.stage.ball.radius;
    let exactPointBottomX =
      this.stage.ball.positionX +
      this.stage.ball.speed +
      this.stage.ball.radius;
    let exactPointBottomY =
      this.stage.ball.positionY +
      this.stage.ball.speed +
      this.stage.ball.radius;

    let crashed = false;
    this.stage.blocks.forEach((block, index) => {
      if (block.strength > 0) {
        if (this._rectCircleCollission(this.stage.ball, block) && !crashed) {
          if (this.stage.ball.positionX > block.positionX + block.width / 2) {
            this.stage.ball.directionY = -this.stage.ball.directionY;
          } else {
            this.stage.ball.directionY = -this.stage.ball.directionY;
            this.stage.ball.directionX = -this.stage.ball.directionX;
          }

          crashed = true;
          block.restStrength();
          block.sumScore();
          if (block.present.type != "n") {
            this.presentsInGame.push(block.present);
          }
        }
      }
    });
    this._checkAllBlocksCrashed();
  }

  _checkLiveLost() {}

  _shotBall() {
    this.stage.shotBall();
  }

  _moveShip(e) {
    if (this.intervalGame != undefined) {
      if (e.clientX + this.stage.ship.width < 500 && e.clientX > 0) {
        //this.ship.positionY = e.clientY;
        this.stage.ship.positionX = e.clientX;
      }
      if (!this.stage.ball.moving) {
        this.stage.ball.positionX =
          this.stage.ship.positionX + this.stage.ship.width / 2;
      }
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

  _rectRectCollission(rect1, rect2) {
    if (
      rect1.positionX < rect2.positionX + rect2.width &&
      rect1.positionX + rect1.width > rect2.positionX &&
      rect1.positionY < rect2.positionY + rect2.height &&
      rect1.height + rect1.positionY > rect2.positionY
    ) {
      return true;
    } else {
      return false;
    }
  }

  _checkKeyPressed(e) {
    if (e.keyCode == 32) {
      if (this.intervalGame === undefined) {
        this.reestartGame();
      } else {
        this.pauseGame();
      }
    }
  }

  _addListeners() {
    document.addEventListener("click", this._shotBall.bind(this));
    document.body.addEventListener("mousemove", this._moveShip.bind(this));
    document.body.addEventListener(
      "keypress",
      this._checkKeyPressed.bind(this)
    );
  }
}
