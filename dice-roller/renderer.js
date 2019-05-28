"use strict";

class Renderer {
    constructor(canvasId = 'canvas', canvasColor = 'black') {
        this.$canvas      = document.getElementById(canvasId);
        this.ctx          = this.$canvas.getContext('2d');
        this.canvasColor  = canvasColor;
        this.canvasWidth  = this.$canvas.clientWidth;
        this.canvasHeight = this.$canvas.clientHeight;
    }

    drawRegularPolygon(polygon) {
        this.ctx.fillStyle = polygon.fillStyle;
        this.ctx.strokeStyle = polygon.strokeStyle;

        this.ctx.beginPath();

        for (let i = 0; i < polygon.vertices.length; i++) {
            this.ctx.moveTo(polygon.vertices[i].x, polygon.vertices[i].y);
            this.ctx.lineTo(polygon.vertices[(i+1)%polygon.vertices.length].x, polygon.vertices[(i+1)%polygon.vertices.length].y);
        }

        this.ctx.fill();

        this.ctx.beginPath();

        for (let i = 0; i < polygon.vertices.length; i++) {
            this.ctx.moveTo(polygon.vertices[i].x, polygon.vertices[i].y);
            this.ctx.lineTo(polygon.vertices[(i+1)%polygon.vertices.length].x, polygon.vertices[(i+1)%polygon.vertices.length].y);
        }

        this.ctx.stroke();
    }

    _wipe() {
        this.ctx.fillStyle = this.canvasColor;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
