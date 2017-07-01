const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid( this.randomPosition() ));
  }
};

Game.prototype.randomPosition = function() {
  let canvas = document.getElementById('canvas'),
      canvasWidth = this.DIM_X,
      canvasHeight = this.DIM_Y;

  let x = Math.random() * canvasWidth,
      y = Math.random() * canvasHeight;

  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach( (asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

module.exports = Game;
