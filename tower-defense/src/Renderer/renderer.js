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
    this.ctx.drawCircle = function(position, radius, fill = false) {
        this.beginPath();
        this.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        if (fill) {
            this.fill();
        } else {
            this.stroke();
        }
    };

    this.canvasColor = 'black';

    this.renderableId = 0;

    this.renderables = {};

    let that = this;
    document.addEventListener('send-ping', function(e) {
        console.log(e);
        e.data.ping.renderer = that;
        that.addRenderable(e.data.ping);
        console.log(that.renderables);
    });
}

Renderer.prototype.getRenderableId = function() {
    return this.renderableId++;
};

Renderer.prototype.addRenderable = function(renderable) {
    this.renderables[renderable.id] = renderable;
};

Renderer.prototype.removeRenderable = function(id) {
    delete this.renderables[id];
};

Renderer.prototype.render = function(transformationMatrix) {
    let that = this;

    this.wipe();
    for (let i in this.renderables) {
        let r = this.renderables[i];
        r.render(transformationMatrix, this.ctx);
    }
};

Renderer.prototype.wipe = function() {
    let ctx = this.ctx;

    ctx.fillStyle = this.canvasColor;
    ctx.rect(0, 0, this.cWidth, this.cHeight);
    ctx.fill();
};
