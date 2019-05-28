"use strict";

class RenderingWrapper {
  constructor (configuration) {
    this.$canvas = document.getElementById(configuration.canvas_id);
    this.ctx = this.$canvas.getContext('2d');
    this._configuration = configuration;
  }

  requestFrame (segments, apple_position) {
    this.wipe();
    this.drawBorder();
    this.drawSnake(segments);
    this.drawApple(apple_position);
  }

  wipe () {
    this.ctx.fillStyle = '#000'
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this._configuration.width, this._configuration.height);
    this.ctx.fill();
  }

  drawBorder () {
    this.ctx.strokeStyle = this._configuration.border_color;
    this.ctx.lineWidth = this._configuration.border_width;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this._configuration.width - 2 * this._configuration.border_width, this._configuration.height - 2 * this._configuration.border_width);
    this.ctx.stroke();
  }

  drawSnake (segments) {
    this.ctx.strokeStyle = this._configuration.snake_color;
    this.ctx.lineWidth = this._configuration.snake_width;
    this.ctx.beginPath();
    let cur = segments.head;
    while (cur != null) {
      if (cur == segments.head) {
        this.ctx.moveTo(cur.value.x, cur.value.y);
      } else {
        this.ctx.lineTo(cur.value.x, cur.value.y);
      }
      cur = cur.next;
    }
    this.ctx.stroke();
  }

  drawApple (position) {
    this.ctx.fillStyle = this._configuration.apple_color;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, this._configuration.apple_radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawCollision (position) {
    this.ctx.fillStyle = this._configuration.collided_color;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, this._configuration.snake_width, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
