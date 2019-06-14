"use strict";

function TowerAttack(from, to, duration, renderer) {
    this.id = null;
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.renderer = renderer;

    this.lineColor = 'purple';
    this.lineWidth = 1;

    this.setDestruct();
}

TowerAttack.prototype.render = function(transformationMatrix, ctx) {
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(transformationMatrix.x(this.from.x), transformationMatrix.y(this.from.y));
    ctx.lineTo(transformationMatrix.x(this.to.x), transformationMatrix.y(this.to.y));
    ctx.stroke();
};

TowerAttack.prototype.setDestruct = function() {
    let that = this;

    setTimeout(function() {
        that.renderer.removeRenderable(that.id);
    }, this.duration);
};