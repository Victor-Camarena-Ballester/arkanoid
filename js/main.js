var game;
function init() {
  const canvas = document.getElementById("myGame");
  const ctx = canvas.getContext("2d");
  const ship = new Ship(
    canvas.width / 2 - 100 / 2,
    canvas.height - 10,
    100,
    10,
    7
  );
  const ball = new Ball(
    ship.positionX + ship.width / 2,
    ship.positionY - ship.height,
    10,
    0
  );

  game = new Game({ ctx: ctx, ship: ship, ball: ball });

  game.startGame();
}

window.onload = init;
