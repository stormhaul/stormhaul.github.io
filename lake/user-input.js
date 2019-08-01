"use strict";

var l = l || {};

l.userInput = (config) => {
    let ui = {};

    ui.init = () => {
        let canvas = document.getElementById(config.canvas.id);
        canvas.addEventListener('mousemove', ui.mouseMoved);
        canvas.addEventListener('click', ui.mouseClicked);

        ui.mouse = {
            position: {x: config.canvas.width / 2, y: config.canvas.height / 2}
        };
    };

    ui.mouseMoved = (event) => {
        ui.mouse.position = {x: event.offsetX, y: event.offsetY};
    };

    ui.mouseClicked = (event) => {
        l.stop = true;

        setTimeout(() => {
            delete l.stop;
            l.init();
        }, 20);
    };

    ui.getMousePosition = () => {
        return ui.mouse.position;
    };

    ui.init();

    return ui;
};
