const imgSprites = new Image();
imgSprites.src = "images/sprite.png";

const imgField = new Image();
imgField.src = "images/fields.png";

const imgShip = new Image();
imgShip.src = "images/ship.png";

const ironImag = new Image();
ironImag.src = "images/ironhack.png";

const audioWin = new Audio("music/Track1.mp3");
const audioGameOver = new Audio("music/Track4.mp3");
const audioBounce = new Audio("music/SFX 6.mp3");
const audioBulletCrasehd = new Audio("music/SFX 10.mp3");
const audioLiveLost = new Audio("music/SFX 2.mp3");
const audioGameOver2 = new Audio("music/6 - Track 6.mp3");

const presentsArr = [
  { type: "n", speed: 0, color: "", imageUrl: imgSprites },
  {
    type: "s+",
    speed: 5,
    color: "#FF0000",
    imageUrl: imgSprites,
    imgPosition: {
      dx: 0,
      dy: 399,
      dw: 44,
      dh: 22
    },
    startPosition: 0
  },
  {
    type: "s-",
    speed: 3,
    color: "#D15BF3",
    imageUrl: imgSprites,
    imgPosition: {
      dx: 352,
      dy: 445,
      dw: 44,
      dh: 22
    },
    startPosition: 352
  },
  {
    type: "w+",
    speed: 2,
    color: "#5BF380",
    imageUrl: imgSprites,
    imgPosition: {
      dx: 0,
      dy: 327,
      dw: 44,
      dh: 22
    },
    startPosition: 0
  },
  {
    type: "w-",
    speed: 4,
    color: "#545252",
    imageUrl: imgSprites,
    imgPosition: {
      dx: 0,
      dy: 424,
      dw: 44,
      dh: 22
    },
    startPosition: 0
  },
  {
    type: "IronHack",
    speed: 5,
    color: "#FF0000",
    imageUrl: imgSprites,
    imgPosition: {
      dx: 352,
      dy: 496,
      dw: 44,
      dh: 22
    },
    startPosition: 352
  }
];
const stagesArr = [
  {
    stageNum: 1,
    options: {
      rows: 4,
      columnWidth: 70,
      speedBall: 5,
      countDown: 5 * 60,
      columnsHidden: [3]
    }
  },
  {
    stageNum: 2,
    options: {
      rows: 6,
      columnWidth: 70,
      speedBall: 5,
      countDown: 4 * 60,
      columnsHidden: [1, 5]
    }
  },
  {
    stageNum: 3,
    options: {
      rows: 7,
      columnWidth: 70,
      speedBall: 5,
      countDown: 3 * 60,
      columnsHidden: [2, 4]
    }
  }
];
