class Stage {
  constructor(
    canvas,
    rows,
    columnWidth,
    speedBall,
    countDown,
    refreshTimer,
    gameOver
  ) {
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
    this.gameOver = gameOver;
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
      this.canvas.height - 40,
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
    let columns = parseInt((this.canvas.width - 50) / this.columnWidth);
    let spaceBetween = 10;

    let divScore = document.getElementById("score");

    let firstY = 30;
    for (let i = 0; i < rows; i++) {
      let firstX = 45;
      for (let c = 0; c < columns; c++) {
        let blockPositionX = c * this.columnWidth + spaceBetween + firstX;
        let blockPositionY = i * 30 + spaceBetween + firstY;
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
      firstY = 0;
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
      this.pauseChrono();
      this.gameOver();
    } else {
      this.refreshTimer(minutes + ":" + seconds);
    }
  }

  get field() {}

  reestartChrono() {
    this.pauseChrono();
    this.stageInterval = setInterval(this._startChronometer.bind(this), 1000);
  }

  pauseChrono() {
    clearInterval(this.stageInterval);
    this.stageInterval = undefined;
  }
}
