"use strict";

function Renderer() {
    this.$canvas = document.getElementById('c');
    this.cWidth  = this.$canvas.width = 1980;
    this.cHeight = this.$canvas.height = this.cWidth * window.innerHeight / window.innerWidth;
    this.ctx     = this.$canvas.getContext('2d');

    this.canvasColor = 'black';
    this.lineColor   = 'white';
}

Renderer.prototype.wipe = function() {
    let ctx = this.ctx;

    ctx.fillStyle = this.canvasColor;
    ctx.rect(0, 0, this.cWidth, this.cHeight);
    ctx.fill();
};

/**
 * @param start {Point}
 * @param end {Point}
 * @param lineColor {string}
 * @param lineWidth {int}
 */
Renderer.prototype.drawLine = function(start, end, lineColor = this.lineColor, lineWidth = 1) {
    let ctx = this.ctx;

    ctx.lineStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
};
