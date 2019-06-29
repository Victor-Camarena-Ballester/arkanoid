# ARKANOID

## Description

A ship throw a ball, the ball bounce with the walls and the ship, the ball has to break blocks at the top of the page.
If the ball goes below the ship, you lose.

## MVP (DOM - CANVAS)

Canvas for the game, DOM for the state(lives) and statistics.

Print a ship.
Print a ball.
Print blocks.
Give movement to the ball rect line.
Move the ship.
Break the blocks.

## Backlog

Create blocks with diferent widths and strength.
Put an images to the ship and the blocks.
Move the ship up and down.
Check collisions and bounces.
Throw presents from the broken blocks:

- Possibility to shot.
- Make the ship bigger or smaller (bad presents)
- Add speed to the ball.
- Reduce speed to the ball

## Data structure

Classes and methods definition.

game class ->
control start, pause, stop, gameover, level, lives.
has state of the game:
gaming, pause...

stage class ->
control the number and position of the blocks. The inital speed of the ball, balls, blocks

ball class ->
control the area, direction, position, speed, inital position (over the ship)

ship class.->
control the area, position.
can move left, right

block class ->
control the area, position, strength

## States y States Transitions

splashScreen .- inital screen, game name, button to start

pauseScreen .- Pause the game and restart at the same point.

gameScreen

gameoverScreen .- lose screen, button to start again.

winScreen (stage).- if a user break all the blocks, win message, go to the next stage.

## Links

### Trello

https://trello.com/b/8xghLXyC/arkanoid

### Git

URls for the project repo and deploy
https://github.com/Victor-Camarena-Ballester/arkanoid || https://victor-camarena-ballester.github.io/arkanoid/.

### Slides

URls for the project presentation (slides) https://slides.com/victorcamarena/deck/live#/
