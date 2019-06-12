"use strict";

function Renderer() {
    this.$canvas = document.getElementById('c');
    this.cWidth  = this.$canvas.width = 1980;
    this.cHeight = this.$canvas.height = this.cWidth * window.innerHeight / window.innerWidth;
    this.ctx     = this.$canvas.getContext('2d');
    this.ctx.drawLine = function(start, end) {
        this.beginPath();
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
        this.stroke();
    };

    this.canvasColor = 'black';
    this.lineColor   = 'white';

    this.renderables = [];
}

Renderer.prototype.addRenderable = function(id, renderable) {
    this.renderables[id] = renderable;
};

Renderer.prototype.render = function(transformationMatrix) {
    let that = this;

    this.wipe();
    this.renderables.map(a => a.render(transformationMatrix, that.ctx));
};

Renderer.prototype.wipe = function() {
    let ctx = this.ctx;

    ctx.fillStyle = this.canvasColor;
    ctx.rect(0, 0, this.cWidth, this.cHeight);
    ctx.fill();
};
