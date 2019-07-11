const canvas = document.getElementById("myGame");
const ctx = canvas.getContext("2d");
const welcomescreen = document.getElementById("welcomescreen");
const playscreen = document.getElementById("playscreen");
const gameoverscreen = document.getElementById("gameoverscreen");
let game = undefined;

function init() {
  const playButton = document.getElementById("button");
  playButton.addEventListener("click", play);
}

function refreshTimer(time) {
  document.getElementById("chronometer").innerHTML = time;
}
function loose() {
  playscreen.classList.toggle("notdisplay");
  gameoverscreen.classList.toggle("notdisplay");
}
function win() {
  playscreen.classList.toggle("notdisplay");
  winscreen.classList.toggle("notdisplay");
}
function showlives(livesNumber) {
  document.getElementById("lives").innerHTML = livesNumber;
}
function pause() {
  let playScreenDiv = document.getElementById("playscreen");
  let pauseDiv = document.createElement("div");
  pauseDiv.innerText = "PAUSED";
  pauseDiv.setAttribute("class", "pause");
  playScreenDiv.appendChild(pauseDiv);
}
function reestart() {
  let pauseDiv = document.getElementsByClassName("pause")[0];
  document.getElementById("playscreen").removeChild(pauseDiv);
}
function play() {
  welcomescreen.classList.toggle("notdisplay");
  playscreen.classList.toggle("notdisplay");

  game = new Game({
    ctx: ctx,
    canvas: canvas,
    refreshTimer: refreshTimer,
    showlives: showlives,
    win: win,
    loose: loose,
    pause: pause,
    reestart: reestart
  });

  game.startGame();
}

window.onload = init;
