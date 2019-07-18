const imgSprites = new Image();
imgSprites.src = "images/sprite.png";

const imgField = new Image();
imgField.src = "images/fields.png";

const imgShip = new Image();
imgShip.src = "images/ship.png";

const ironImag = new Image();
ironImag.src = "images/ironhack.png";

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
    }
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
    }
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
    }
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
    }
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
    }
  }
];
const stagesArr = [
  {
    stageNum: 1,
    options: { rows: 4, columnWidth: 70, speedBall: 5, countDown: 5 * 60 }
  },
  {
    stageNum: 2,
    options: { rows: 5, columnWidth: 70, speedBall: 5, countDown: 6 * 60 }
  },
  {
    stageNum: 3,
    options: { rows: 6, columnWidth: 70, speedBall: 5, countDown: 7 * 60 }
  }
];
