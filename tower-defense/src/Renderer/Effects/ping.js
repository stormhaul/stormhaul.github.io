"use strict";

function Ping(position, duration, renderer) {
    this.id = null;
    this.position = position;
    this.duration = duration;
    this.renderer = renderer;
    this.radius = 50;

    this.lineColor = 'purple';
    this.lineWidth = 1;

    this.setDestruct();
}

Ping.prototype.render = function(transformationMatrix, ctx) {
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;

    console.log(this);
    ctx.drawCircle(new Point(transformationMatrix.x(this.position.x), transformationMatrix.y(this.position.y)), transformationMatrix.radius(this.radius));
};

Ping.prototype.setDestruct = function() {
    let that = this;

    setTimeout(function() {
        that.renderer.removeRenderable(that.id);
    }, this.duration);
};