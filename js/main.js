var game;
function init() {
  const canvas = document.getElementById("myGame");
  const ctx = canvas.getContext("2d");

  game = new Game({ ctx: ctx, canvas: canvas });

  game.startGame();
}

window.onload = init;
