class Stage {
  constructor(canvas, rows, columns) {
    this.canvas = canvas;
    this.rows = rows;
    this.columns = columns;
    this.blocks = [];
    this.ship = undefined;
    this.ball = undefined;
    this.countDown = 60 * 5;
    this.stageInterval = undefined;
  }

  createStage() {
    this._createShip();
    this._createBall();
    this._createBlocks();
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

    document.getElementById("chronometer").innerHTML = minutes + ":" + seconds;
  }
  reestartChrono() {
    this.stageInterval = setInterval(this._startChronometer.bind(this), 1000);
  }
  pauseChrono() {
    clearInterval(this.stageInterval);
    this.stageInterval = undefined;
  }
}
