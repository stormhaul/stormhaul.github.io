"use strict";

var spiro = spiro || {};

spiro.controller = (renderer, userInput, outerCircle, innerCircle, spiral, marker) => {
    let controller = {};

    controller.init = () => {
        controller.showGuides = true;

        document.addEventListener('restart', controller.restartedAnimation);
        document.addEventListener('finish', controller.finishedAnimation);
    };

    controller.restartedAnimation = () => {
        controller.showGuides = true;
    };

    controller.finishedAnimation = () => {
        controller.showGuides = false;
    };

    controller.loop = () => {
        renderer.wipe();
        spiral.draw();
        if (controller.showGuides) {
            outerCircle.draw();
            innerCircle.draw();
            marker.draw();

            marker.rotate();
        }
        requestAnimationFrame(controller.loop);
    };

    controller.init();

    return controller;
};