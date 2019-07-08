const canvas = document.getElementById("myGame");
const ctx = canvas.getContext("2d");
const welcomescreen = document.getElementById("welcomescreen");
const playscreen = document.getElementById("playscreen");
const gameoverscreen = document.getElementById("gameoverscreen");

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

function play() {
  welcomescreen.classList.toggle("notdisplay");
  playscreen.classList.toggle("notdisplay");

  const game = new Game({
    ctx: ctx,
    canvas: canvas,
    refreshTimer: refreshTimer,
    showlives: showlives,
    win: win,
    loose: loose
  });

  game.startGame();
}

window.onload = init;
