"use strict";

var l = l || {};

l.renderer = (userInput, config) => {
    let renderer = {};

    renderer.canvas        = document.getElementById(config.canvas.id);
    renderer.canvas.width  = config.canvas.width;
    renderer.canvas.height = config.canvas.height;
    renderer.ctx           = renderer.canvas.getContext('2d');

    renderer.wipe = () => {
        renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);

        let ctx = renderer.ctx;

        ctx.globalCompositeOperation = 'source-over';
        // Paint the canvas black.
        ctx.fillStyle = '#000';
        ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
        ctx.fillRect(0, 0, renderer.canvas.width, renderer.canvas.height);

        ctx.beginPath();
        let radialGradient = ctx.createRadialGradient(userInput.mouse.position.x, userInput.mouse.position.y, 1, userInput.mouse.position.x, userInput.mouse.position.y, config.light.radius);
        radialGradient.addColorStop(0, 'rgba(255,255,255,1)');
        radialGradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.globalCompositeOperation = "difference";
        //ctx.globalCompositeOperation = 'source-out';

        ctx.fillStyle = radialGradient;
        ctx.arc(userInput.mouse.position.x, userInput.mouse.position.y, config.light.radius, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
    };

    return renderer;
};