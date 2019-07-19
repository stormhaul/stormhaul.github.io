"use strict";

var spiro = spiro || {};

spiro.renderer = () => {
    let canvasId = spiro.config['canvasId'];

    let renderer = {};

    renderer.init = () => {
        renderer.updateCanvasSize()
    };

    renderer.canvas = document.getElementById(canvasId);

    if (renderer.canvas === null) {
        throw new Error('Unable to find canvas, check that there is an element with id: ' + canvasId + ' or update configuration.');
    }

    renderer.ctx = renderer.canvas.getContext('2d');

    renderer.updateCanvasSize = () => {
        renderer.canvas.width  = window.innerWidth;
        renderer.canvas.height = window.innerHeight;
    };

    renderer.wipe = () => {
        renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
    };

    renderer.ellipse = (x, y, rx, ry, angle) => {
        renderer.ctx.lineWidth   = spiro.config['ellipse']['lineWidth'];
        renderer.ctx.strokeStyle = spiro.config['ellipse']['lineColor'];
        renderer.ctx.beginPath();
        renderer.ctx.ellipse(x, y, rx, ry, angle, 0, 2 * Math.PI);
        renderer.ctx.stroke();
    };

    renderer.spiral = (points, color) => {
        renderer.ctx.beginPath();
        renderer.ctx.lineWidth   = spiro.config['spiral']['lineWidth'];
        renderer.ctx.strokeStyle = color;
        renderer.ctx.lineJoin    = spiro.config['spiral']['lineJoin'];

        points.map((point, index) => {
            if (index === 0) {
                renderer.ctx.moveTo(point.x, point.y);
            } else {
                renderer.ctx.lineTo(point.x, point.y);
            }
        });

        renderer.ctx.stroke();
    };

    renderer.marker = (x, y, color) => {
        renderer.ctx.beginPath();
        renderer.ctx.fillStyle = color;
        renderer.ctx.arc(x, y, spiro.config['marker']['radius'], 0, 2 * Math.PI);
        renderer.ctx.fill();
    };

    renderer.init();

    return renderer;
};