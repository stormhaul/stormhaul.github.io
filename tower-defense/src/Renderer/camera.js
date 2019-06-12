"use strict";

/**
 * @param renderer {Renderer}
 * @constructor
 */
function Camera(renderer) {
    this.renderer   = renderer;
    this.viewWidth  = this.renderer.$canvas.width;
    this.viewHeight = this.renderer.$canvas.height;
    this.position   = {x: this.viewWidth / 2, y: this.viewHeight / 2};

    this.scrollRate = 10;
    this.zoomRate = 10;
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
    let dir = direction / Math.abs(direction);
    let ratio = this.$canvas.height / this.$canvas.width;
    this.viewWidth -= this.zoomRate * dir;
    this.viewHeight -= this.zoomRate * dir * ratio;

    this.position.x += this.zoomRate / 2 * dir;
    this.position.y += this.zoomRate / 2 * dir * ratio;
};

Camera.prototype.requestFrame = function() {
    this.renderer.render();
};

