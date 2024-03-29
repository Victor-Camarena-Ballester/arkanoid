class Game {
  constructor(options) {
    this.gameState = undefined;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.stage = undefined;
    this.presentsInGame = [];
    this.lives = 3;
    this.stageNumber = 1;
    this.showlives = options.showlives;
    this.refreshTimer = options.refreshTimer;
    this.win = options.win;
    this.loose = options.loose;
    this.pause = options.pause;
    this.reestart = options.reestart;
    this.bulletsInGame = [];
    this.intervalBullets = undefined;
    this.countBullets = 0;
    this.messageStage = options.messageStage;
  }

  _setCurrentStage() {
    document.getElementById("mainMusic").play();
    document.getElementById("mainMusic").volume = 0;

    let actualStage = stagesArr.find(stage => {
      return stage.stageNum === this.stageNumber;
    });

    if (!actualStage) {
      this._winGame();
      return;
    }

    this.stage = new Stage(
      this.canvas,
      actualStage.options.rows,
      actualStage.options.columnWidth,
      actualStage.options.speedBall,
      actualStage.options.countDown,
      this.refreshTimer,
      this.gameOver,
      this.stageNumber,
      this.bulletsInGame,
      actualStage.options.columnsHidden
    );
    this.stage.createStage();

    if (actualStage.stageNum > 1) {
      this.messageStage(actualStage.stageNum);
    }
    setTimeout(this._volumeUP, 2500);
  }

  _volumeUP() {
    document.getElementById("mainMusic").volume = 0.8;
  }

  _winGame() {
    this.gameState = "win";

    this.stage.pauseChrono();
    cancelAnimationFrame(this.intervalGame);
    this.intervalGame = undefined;
    this.win();
  }

  startGame() {
    this.gameState = "running";
    this._addListeners();
    this._setCurrentStage();

    this.intervalGame = window.requestAnimationFrame(
      this._refreshScreen.bind(this)
    );
  }

  pauseGame() {
    if (this.gameState === "running") {
      this.gameState = "paused";
      document.getElementById("mainMusic").pause();
      this.stage.pauseChrono();
      cancelAnimationFrame(this.intervalGame);
      this.intervalGame = undefined;
      this.pause();
    }
  }

  gameOver() {
    this.gameState = "loose";
    document.getElementById("mainMusic").pause();
    document.getElementById("mainMusic").currentTime = 0.0;

    this.stage.pauseChrono();
    this.intervalGame = undefined;

    this.loose();

    let audioN = new Audio("music/Track4.mp3");
    audioN.play();
  }

  reestartGame() {
    if (this.gameState === "paused") {
      this.gameState = "running";
      document.getElementById("mainMusic").play();
      this.intervalGame = window.requestAnimationFrame(
        this._refreshScreen.bind(this)
      );
      this.stage.reestartChrono();
      this.reestart();
    }
  }

  _cleanScreen() {
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _printField() {
    this.ctx.drawImage(
      imgField,
      (this.stageNumber - 1) * 192,
      0,
      191,
      230,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  _moveShip() {
    if (this.stage.ship.positionX <= 20 && this.stage.ship.moveRight === true) {
      this.stage.ship.move();
    }
    if (
      this.stage.ship.positionX >=
        this.canvas.width - this.stage.ship.width - 20 &&
      this.stage.ship.moveLeft === true
    ) {
      this.stage.ship.move();
    }

    if (
      this.stage.ship.positionX > 20 &&
      this.stage.ship.positionX < this.canvas.width - this.stage.ship.width - 20
    ) {
      this.stage.ship.move();
    }

    if (!this.stage.ball.moving) {
      this.stage.ball.positionX =
        this.stage.ship.positionX + this.stage.ship.width / 2;
    }
  }

  _printShip() {
    this._moveShip();
    this.ctx.beginPath();

    this.ctx.drawImage(
      imgShip,
      0,
      0,
      50,
      8,
      this.stage.ship.positionX,
      this.stage.ship.positionY,
      this.stage.ship.width,
      this.stage.ship.height
    );

    this.ctx.fill();
    this.ctx.closePath();
  }

  _printBlocks() {
    this.stage.blocks.forEach(block => {
      if (block.strength > 0) {
        this.ctx.beginPath();
        this.ctx.drawImage(
          block.image.imageUrl,
          block.image.imgPosition.dx,
          block.image.imgPosition.dy,
          block.image.imgPosition.dw,
          block.image.imgPosition.dh,
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );
        this.ctx.closePath();
      }
    });
  }

  _printPresents() {
    this.presentsInGame.forEach(present => {
      if (present.type != "n") {
        this.ctx.beginPath();
        this.ctx.drawImage(
          present.imageUrl,
          present.imgPosition.dx,
          present.imgPosition.dy,
          present.imgPosition.dw,
          present.imgPosition.dh,
          present.positionX,
          present.positionY,
          present.imgPosition.dw,
          present.imgPosition.dh
        );
        this.ctx.closePath();
        present.moveDown();
      }
    });
  }

  _printBullets() {
    this.bulletsInGame.forEach(bullet => {
      this.ctx.beginPath();
      this.ctx.drawImage(
        bullet.image.imageUrl,
        bullet.image.imgPosition.dx,
        bullet.image.imgPosition.dy,
        bullet.image.imgPosition.dw,
        bullet.image.imgPosition.dh,
        bullet.positionX,
        bullet.positionY,
        bullet.image.imgPosition.dw,
        bullet.image.imgPosition.dh
      );
      this.ctx.closePath();
      bullet.move();
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

    this.ctx.fillStyle = this.stage.ball.color;
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
    if (this.gameState === "running") {
      this._checkStageTime();
      this._cleanScreen();
      this._checkAllCollissions();
      this._printField();
      this._printBall();
      this._printShip();
      this._printBlocks();
      this._printPresents();
      this._printBullets();

      if (this.intervalGame !== undefined) {
        window.requestAnimationFrame(this._refreshScreen.bind(this));
      }
    }
  }

  _checkStageTime() {
    if (this.stage.countDown < 0) {
      this.gameOver();
    }
  }

  _checkAllCollissions() {
    this._checkCollisionWalls();
    this._checkCollisionsBlocks();
    this._checkPresentsGone();
    this._checkBulletsGone();
    this._checkCollisionPresents();
    this._checkCollisionShip();
    this._checkCollisionsBullets();
  }

  _checkCollisionWalls() {
    if (
      this.stage.ball.positionX -
        this.stage.ball.speed -
        this.stage.ball.radius <
        20 ||
      this.stage.ball.positionX +
        this.stage.ball.speed +
        this.stage.ball.radius >
        this.canvas.width - 20
    ) {
      this._bounceSound();
      this.stage.ball.directionX = -this.stage.ball.directionX;
    }
    if (
      this.stage.ball.positionY -
        this.stage.ball.speed -
        this.stage.ball.radius <
      10
    ) {
      this._bounceSound();
      this.stage.ball.directionY = -this.stage.ball.directionY;
    }
    if (this.stage.ball.positionY > this.canvas.height) {
      this.lives -= 1;
      if (this.lives === 0) {
        this.showlives(this.lives);
        this.gameOver();
        this._gameOverSound();
      } else {
        this._liveLostSound();
        this.showlives(this.lives);
        this.stage.createBall();
      }
    }
  }

  _checkCollisionShip() {
    if (
      this._rectCircleCollission(this.stage.ball, this.stage.ship) &&
      this.stage.ball.moving
    ) {
      this._bounceSound();
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
      this.presentsInGame[indexToDelete].stopRolling();
      this.presentsInGame.splice(indexToDelete, 1);
    }
  }
  _checkBulletsGone() {
    if (this.bulletsInGame.length === 0) {
      return;
    }

    let indexToDelete = undefined;

    this.bulletsInGame.forEach((bullet, index) => {
      if (bullet.positionY < 0) {
        indexToDelete = index;
      }
    });
    if (indexToDelete != undefined) {
      this.bulletsInGame.splice(indexToDelete, 1);
    }
  }

  _checkCollisionPresents() {
    let indexToDelete = undefined;
    this.presentsInGame.forEach((present, index) => {
      if (this._rectRectCollission(present, this.stage.ship) && !present.used) {
        if (
          (present.type === "IronHack" && !this.stage.isShoothing) ||
          present.type !== "IronHack"
        ) {
          this.stage.givePresentToGame(present);
          present.used = true;
          indexToDelete = index;
        }
      }
    });
    if (indexToDelete != undefined) {
      this.presentsInGame[indexToDelete].stopRolling();
      this.presentsInGame.splice(indexToDelete, 1);
    }
  }

  _checkAllBlocksCrashed() {
    let count = this.stage.blocks.filter(block => {
      return block.strength > 0;
    });

    if (count.length === 0 && this.gameState === "running") {
      this.stage.pauseChrono();
      this.stageNumber += 1;
      this.presentsInGame = [];
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
          this._bounceSound();
          if (this.stage.ball.positionX > block.positionX + block.width / 2) {
            this.stage.ball.directionY = -this.stage.ball.directionY;
          } else {
            this.stage.ball.directionY = -this.stage.ball.directionY;
            this.stage.ball.directionX = -this.stage.ball.directionX;
          }

          crashed = true;
          block.restStrength();
          block.sumScore();
          if (block.present.type != "n" && block.strength < 1) {
            this.presentsInGame.push(block.present);
          }
        }
      }
    });

    this._checkAllBlocksCrashed();
  }

  _checkCollisionsBullets() {
    let indexBulletToDelete = undefined;
    this.bulletsInGame
      .filter(f => {
        return !f.crashed;
      })
      .forEach((bullet, indexBullet) => {
        this.stage.blocks
          .filter(b => {
            return b.strength > 0;
          })
          .forEach((block, indexBlock) => {
            if (this._rectRectCollission(bullet, block)) {
              this._bulletCrashedSound();
              indexBulletToDelete = indexBullet;
              bullet.crashed = true;
              block.restStrength();
              block.sumScore();
              if (block.present.type != "n" && block.strength < 1) {
                this.presentsInGame.push(block.present);
              }
            }
          });
      });
    if (indexBulletToDelete != undefined) {
      this.bulletsInGame.splice(indexBulletToDelete, 1);
    }
    this._checkAllBlocksCrashed();
  }

  _shotBall() {
    this.stage.shotBall();
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
    if (e.keyCode === 39) {
      this.stage.ship.moveRight = true;
    }
    if (e.keyCode === 37) {
      this.stage.ship.moveLeft = true;
    }
    if (e.keyCode === 13) {
      this._shotBall();
    }
  }
  _checkKeyUp(e) {
    if (e.keyCode === 39) {
      this.stage.ship.moveRight = false;
    }
    if (e.keyCode === 37) {
      this.stage.ship.moveLeft = false;
    }
  }

  _addListeners() {
    document.body.addEventListener("keydown", this._checkKeyPressed.bind(this));
    document.body.addEventListener("keyup", this._checkKeyUp.bind(this));
  }

  _bulletCrashedSound() {
    let audioN = new Audio("music/SFX 10.mp3");
    audioN.play();
  }
  _bounceSound() {
    let audioN = new Audio("music/SFX 6.mp3");
    audioN.play();
  }
  _liveLostSound() {
    let audioN = new Audio("music/SFX 2.mp3");
    audioN.play();
  }
  _gameOverSound() {
    let audioN = new Audio("music/6 - Track 6.mp3");
    audioN.play();
  }
}
