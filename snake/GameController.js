"use strict";

class GameController {
  constructor (configuration) {
    let that = this;
    this._configuration = configuration;

    this.user = new UserInput(configuration);
    this.snake = new SnakeController(configuration, function(){
      that.collided = true;
      that.render.drawCollision(that.snake.position);
    });
    this.render = new RenderingWrapper(configuration);

    this.collided = false;
  }

  loop () {
    let that = this;

    setTimeout(function () {
      let next_pos = that.addVector(that.snake.position, that.user.command);
      let ate = that.distance(that.snake.position, that.snake.apple_position) <= (that._configuration.snake_width + that._configuration.apple_radius);
      that.snake.advanceSnake(next_pos, ate);
      that.render.requestFrame(that.snake.segments, that.snake.apple_position);
      if (!that.collided) {
        that.loop();
      }
    }, this._configuration.tick_delay);
  }

  distance (v1,v2) {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
  }

  addVector (v1, v2) {
    return {x:v1.x + v2.x, y: v1.y + v2.y};
  }
}
