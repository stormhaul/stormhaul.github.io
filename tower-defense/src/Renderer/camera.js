"use strict";

/**
 * @param renderer {Renderer}
 * @constructor
 */
function Camera(renderer) {
    this.renderer   = renderer;
    this.viewWidth  = this.renderer.$canvas.width;
    this.viewHeight = this.renderer.$canvas.height;
    this.position   = {x: -500, y: -40};

    this.scrollRate = 10;
    this.zoomRate = 100;
}

/**
 * @param vector {Point}
 */
Camera.prototype.scroll = function(vector) {
    let length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

    this.position.x += this.scrollRate * length * vector.x;
    this.position.y += this.scrollRate * length * vector.y;
};

/**
 * @param direction {int}
 */
Camera.prototype.zoom = function(direction) {
    // prevent extreme zooming
    if (
        ((this.viewHeight >= this.renderer.$canvas.height || this.viewWidth >= this.renderer.$canvas.width) && direction > 0) ||
        ((this.viewHeight <= this.renderer.$canvas.height / 2 || this.viewWidth <= this.renderer.$canvas.width / 2) && direction < 0)
    ) {
        return;
    }

    let dir = direction / Math.abs(direction);
    let ratio = this.renderer.$canvas.height / this.renderer.$canvas.width;

    let delta = {x: this.zoomRate * dir, y: this.zoomRate * dir * ratio};
    this.viewWidth += delta.x;
    this.viewHeight += delta.y;

    console.log(this.viewWidth, this.viewHeight, this.position, delta);

    this.position.x -= (delta.x) / 2;
    this.position.y -= (delta.y) / 2;
};

/**
 * @param point {Point}
 * @returns {Point}
 */
Camera.prototype.translateCanvasToSpace = function(point) {
    return new Point((point.x + this.position.x) * this.viewWidth / this.renderer.$canvas.width, (point.y + this.position.y) * this.viewHeight / this.renderer.$canvas.height);
};

Camera.prototype.requestFrame = function() {
    let that = this;
    let transformationMatrix = {
        x: function(x) {return x * that.renderer.$canvas.width / that.viewWidth - that.position.x},
        y: function(y) {return y * that.renderer.$canvas.height / that.viewHeight - that.position.y},
        radius: function(radius) {return radius * that.renderer.$canvas.width / that.viewWidth}
    };
    this.renderer.render(transformationMatrix);
};

