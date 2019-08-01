"use strict";

var l = l || {};

l.init = () => {
    let userInput = l.userInput(l.config);
    let renderer = l.renderer(userInput, l.config);
    let fish = [];

    for (let i = 0; i < 50; i++) {
        fish.push(l.waterParent('fish', {x: Math.floor(Math.random() * l.config.canvas.width), y: Math.floor(Math.random() * l.config.canvas.height)}, userInput, renderer, l.config));
    }

    let loop = () => {
        renderer.wipe();

        fish.map((f) => {
            f.progress(fish);
            f.draw(false);
        });

        fish.map((f) => {
            f.draw();
        });

        if (l.stop === undefined) {
            requestAnimationFrame(loop);
        }
    };

    requestAnimationFrame(loop);
};

window.onload = () => {
    l.init();
};