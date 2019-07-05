class Game {
  constructor(options) {
    this.gameState = undefined;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.ship = undefined;
    this.ball = undefined;
    this.blocks = [];
    this.presentsInGame = [];
    this.lives = 3;
    this.stageInterval = undefined;
    this.countDown = 60 * 5;
  }

  startGame() {
    this._addListeners();
    this._createBlocks();
    this._createShip();
    this._createBall();
    this.intervalGame = window.requestAnimationFrame(
      this._refreshScreen.bind(this)
    );
    setInterval(this._startChronometer.bind(this), 1000);
  }

  _startChronometer() {
    var minutes;
    var seconds;

    minutes = parseInt(this.countDown / 60, 10);
    seconds = parseInt(this.countDown % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (--this.countDown < 0) {
      alert("looser!");
    }

    document.getElementById("chronometer").innerHTML = minutes + ":" + seconds;
  }
  _cleanScreen() {
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
      this.ball.positionX,
      this.ball.positionY,
      this.ball.radius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();

    if (this.ball.directionX === 0) {
      this.ball.directionX = 1;
    }
    if (this.ball.directionY === 0) {
      this.ball.directionY = 1;
    }

    this.ball.positionX += this.ball.directionX * this.ball.speed;
    this.ball.positionY += this.ball.directionY * this.ball.speed;
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

  _createShip() {
    this.ship = new Ship(
      this.canvas.width / 2 - 50,
      this.canvas.height - 10,
      100,
      10,
      7
    );
  }
  _createBall() {
    this.ball = new Ball(
      this.ship.positionX + this.ship.width / 2,
      this.ship.positionY - 11,
      10,
      0
    );
  }

  _createBlocks() {
    let rows = 4;
    let columns = this.canvas.width / 100;
    let spaceBetween = 10;

    let divScore = document.getElementById("score");

    for (let i = 0; i < rows; i++) {
      for (let c = 0; c < columns; c++) {
        let blockPositionX = c * 100 + spaceBetween;
        let blockPositionY = i * 30 + spaceBetween;
        let blockWidth = 100 - spaceBetween;
        let blockHeight = 30 - spaceBetween;

        let newPresent = new Present(
          presentsArr[Math.floor(Math.random() * presentsArr.length)]
        );

        newPresent.positionX = blockPositionX;
        newPresent.positionY = blockPositionY;
        newPresent.width = blockWidth;
        newPresent.height = blockHeight;

        let block = new Block(
          blockPositionX,
          blockPositionY,
          blockWidth,
          blockHeight,
          Math.floor(Math.random() * (3 - 1 + 1)) + 1,
          divScore,
          newPresent
        );
        this.blocks.push(block);
      }
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
      this.ball.positionX - this.ball.speed - this.ball.radius < 0 ||
      this.ball.positionX + this.ball.speed + this.ball.radius > 500
    ) {
      this.ball.directionX = -this.ball.directionX;
    }
    if (this.ball.positionY - this.ball.speed - this.ball.radius < 0) {
      this.ball.directionY = -this.ball.directionY;
    }
    if (this.ball.positionY > this.canvas.height) {
      alert("loose");
      this._createBall();
    }
  }
  _checkCollisionShip() {
    if (this._rectCircleCollission(this.ball, this.ship) && this.ball.moving) {
      var ballPos = this.ball.positionX - this.ship.positionX;
      var relativePos = this.ship.width - ballPos;
      var angle = relativePos * (Math.PI / this.ship.width);

      var newVel = Math.cos(angle);
      this.ball.directionY = -this.ball.directionY;
      this.ball.directionX = newVel;
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
      if (this._rectRectCollission(present, this.ship) && !present.used) {
        this._givePresentToGame(present);
        present.used = true;
      }
    });
  }
  _givePresentToGame(presentColissioned) {
    if (presentColissioned.type === "w+") {
      this.ship.grow();
    }
    if (presentColissioned.type === "s+") {
      this.ball.goFaster();
    }
    if (presentColissioned.type === "w-") {
      this.ship.decrease();
    }
    if (presentColissioned.type === "s-") {
      this.ball.goSlower();
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
          if (block.present.type != "n") {
            this.presentsInGame.push(block.present);
          }
        }
      }
    });
  }

  _checkLiveLost() {}

  _shotBall() {
    if (!this.ball.moving) {
      this.ball.speed = 3;
      this.ball.moving = true;
    }
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

  _addListeners() {
    document.addEventListener("click", this._shotBall.bind(this));
    document.body.addEventListener("mousemove", this._moveShip.bind(this));
  }
}
