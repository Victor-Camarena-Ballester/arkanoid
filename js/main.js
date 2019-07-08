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

function play() {
  let div;

  const game = new Game({
    ctx: ctx,
    canvas: canvas,
    refreshTimer: refreshTimer
  });

  game.startGame();
}

window.onload = init;
