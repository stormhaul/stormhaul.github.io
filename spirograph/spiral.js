"use strict";

var spiro = spiro || {};

spiro.spiral = (renderer, userInput) => {
    let spiral = {};

    spiral.init = () => {
        spiral.points = [];
    };

    spiral.addPoint = (point) => {
        spiral.points.push(point);
    };

    spiral.draw = () => {
        renderer.spiral(spiral.points, userInput.getValue('color'));
    };

    spiral.handleUserInputChange = () => {
        spiral.init();
    };

    userInput.subscribe('marker', spiral.handleUserInputChange);
    userInput.subscribe('innerCircle', spiral.handleUserInputChange);
    userInput.subscribe('outerCircle', spiral.handleUserInputChange);

    spiral.init();

    return spiral;
};