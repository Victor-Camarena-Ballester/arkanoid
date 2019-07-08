class Stage {
  constructor(canvas, rows, columnWidth, speedBall, countDown, refreshTimer) {
    this.canvas = canvas;
    this.rows = rows;
    this.blocks = [];
    this.ship = undefined;
    this.ball = undefined;
    this.countDown = countDown;
    this.stageInterval = undefined;
    this.speedBall = speedBall;
    this.columnWidth = columnWidth;
    this.refreshTimer = refreshTimer;
  }

  createStage() {
    this._createShip();
    this._createBall();
    this._createBlocks();
    this.stageInterval = undefined;
    this.stageInterval = setInterval(this._startChronometer.bind(this), 1000);
    this._startChronometer();
  }

  createBall() {
    this._createBall();
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
    let rows = this.rows;
    let columns = parseInt((this.canvas.width - 10) / this.columnWidth);
    let spaceBetween = 10;

    let divScore = document.getElementById("score");

    for (let i = 0; i < rows; i++) {
      for (let c = 0; c < columns; c++) {
        let blockPositionX = c * this.columnWidth + spaceBetween;
        let blockPositionY = i * 30 + spaceBetween;
        let blockWidth = this.columnWidth - spaceBetween;
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

  givePresentToGame(presentColissioned) {
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

  shotBall() {
    if (!this.ball.moving) {
      this.ball.speed = this.speedBall;
      this.ball.moving = true;
    }
  }

  _startChronometer() {
    let minutes;
    let seconds;

    minutes = parseInt(this.countDown / 60, 10);
    seconds = parseInt(this.countDown % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (--this.countDown < 0) {
      alert("looser!");
    }

    this.refreshTimer(minutes + ":" + seconds);
  }

  reestartChrono() {
    this.stageInterval = setInterval(this._startChronometer.bind(this), 1000);
  }

  pauseChrono() {
    clearInterval(this.stageInterval);
    this.stageInterval = undefined;
  }
}
