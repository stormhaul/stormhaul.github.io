"using strict";

class RenderingWrapper {
  constructor (configuration) {
    this.$canvas = document.getElementById(configuration.canvas_id);
    this.ctx = this.$canvas.getContext('2d');
    this._configuration = configuration;
  }

  drawBorder () {
    this.ctx.strokeStyle = this._configuration.border_color;
    this.ctx.lineWidth = this._configuration.border_width;
    this.drawRect(0, 0, this._configuration.width - 1, this._configuration.height - 1);
  }
}
