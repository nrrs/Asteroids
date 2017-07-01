const Game = require('./game.js');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById('canvas').getContext('2d');
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
