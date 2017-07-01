const MovingObject = require('./lib/moving_object.js');
const Asteroid = require('./lib/asteroid.js');
const Ship = require('./lib/ship.js');
const Utils = require('./lib/utils.js');
const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

  let gameView = new GameView();
  gameView.start();
});
