/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function MovingObject(options) {
  let { pos, vel, radius, color } = options;
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = MovingObject;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Util = {
  inherits (child, parent) {
    function Surrogate() {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  },
  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Asteroid = __webpack_require__(0);
const Ship = __webpack_require__(5);
const Utils = __webpack_require__(3);
const Game = __webpack_require__(1);
const GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

  let gameView = new GameView();
  gameView.start();
});


/***/ })
/******/ ]);