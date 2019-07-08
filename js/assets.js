const presentsArr = [
  { type: "n", speed: 0, color: "" },
  { type: "s+", speed: 5, color: "#FF0000" },
  { type: "s-", speed: 3, color: "#D15BF3" },
  { type: "w+", speed: 2, color: "#5BF380" },
  { type: "w-", speed: 4, color: "#545252" }
];
const stagesArr = [
  {
    stageNum: 1,
    options: { rows: 1, columnWidth: 200, speedBall: 3, countDown: 5 * 1 }
  },
  {
    stageNum: 2,
    options: { rows: 1, columnWidth: 200, speedBall: 4, countDown: 4 * 60 }
  },
  {
    stageNum: 3,
    options: { rows: 1, columnWidth: 200, speedBall: 5, countDown: 3 * 60 }
  }
];
