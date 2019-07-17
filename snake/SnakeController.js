"use strict";

class SnakeController
{
  constructor (configuration, collision_callback) {
    this._configuration = configuration;
    this._length = 1;

    this.generateNewApple();

    this.position = {
      x: Math.round(this._configuration.width / 2),
      y: Math.round(this._configuration.height / 2)
    };
    this.previous_position = {
      x: Math.round(this._configuration.width / 2),
      y: Math.round(this._configuration.width / 2) + 1
    };

    this.segments = new LinkedList(configuration, collision_callback);
    this.segments.addToHead(this.position, true);
    this.segments.addToHead(this.previous_position, true);
  }

  advanceSnake (position, ate = false) {
    console.log('hi');
    this.previous_position = this.position;
    this.segments.addToHead(position, ate);
    this.position = position;
    if (ate) {
      this.generateNewApple();
    }
  }

  generateNewApple () {
    let x = this.generateRandomNumberBetween(
      50,
      this._configuration.width-51
    );
    let y = this.generateRandomNumberBetween(
      50,
      this._configuration.height-51
    );
    this.apple_position = {x: x, y: y};
  }

  generateRandomNumberBetween (start, end) {
    let magnitude = Math.abs(end - start);
    return Math.floor(Math.random() * magnitude + start);
  }
}
