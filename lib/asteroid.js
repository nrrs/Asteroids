const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

const Asteroid = function(pos)  {
  this.pos = pos;

  this.__proto__.constructor({
    pos: pos,
    vel: Util.randomVec(7),
    radius: this.RADIUS,
    color: this.COLOR
  });
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.COLOR = 'brown';
Asteroid.prototype.RADIUS = 30;

module.exports = Asteroid;
