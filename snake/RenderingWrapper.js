"using strict";

class RenderingWrapper {
  constructor (configuration) {
    this.$canvas = document.getElementById(configuration.canvas_id);
    this.ctx = this.$canvas.getContext('2d');
    this._configuration = configuration;
  }

  requestFrame (segments, apple_position) {
    this.drawBorder();
    this.drawSnake(segments);
    this.drawApple(apple_position);
  }

  drawBorder () {
    this.ctx.strokeStyle = this._configuration.border_color;
    this.ctx.lineWidth = this._configuration.border_width;
    this.drawRect(0, 0, this._configuration.width - 1, this._configuration.height - 1);
  }

  drawSnake (segments) {
    this.ctx.strokeStyle = this._configuration.snake_color;
    this.ctx.lineWidth = this._configuration.snake_width;
    this.ctx.beginPath();
    for (let i in segments) {
      if (i == 0) {
        this.ctx.moveTo(segment[i]);
        continue;
      }
      this.ctx.lineTo(segment[i]);
    }
    this.ctx.stroke();
  }

  drawApple (position) {
    this.ctx.fillStyle = this._configuration.apple_color;
    this.ctx.arc(position.x, position.y, this._configuration.apple_radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
