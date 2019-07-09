const imgEnlarge = new Image();
imgEnlarge.src = "images/enlarge.gif";

const presentsArr = [
  { type: "n", speed: 0, color: "", imageUrl: imgEnlarge },
  {
    type: "s+",
    speed: 5,
    color: "#FF0000",
    imageUrl: imgEnlarge
  },
  {
    type: "s-",
    speed: 3,
    color: "#D15BF3",
    imageUrl: imgEnlarge
  },
  {
    type: "w+",
    speed: 2,
    color: "#5BF380",
    imageUrl: imgEnlarge
  },
  {
    type: "w-",
    speed: 4,
    color: "#545252",
    imageUrl: imgEnlarge
  }
];
const stagesArr = [
  {
    stageNum: 1,
    options: { rows: 5, columnWidth: 80, speedBall: 3, countDown: 5 * 60 }
  },
  {
    stageNum: 2,
    options: { rows: 6, columnWidth: 80, speedBall: 4, countDown: 4 * 60 }
  },
  {
    stageNum: 3,
    options: { rows: 7, columnWidth: 80, speedBall: 5, countDown: 3 * 60 }
  }
];

const imgField = new Image();
imgField.src = "images/fields.png";

const imgShip = new Image();
imgShip.src = "images/ship.png";
