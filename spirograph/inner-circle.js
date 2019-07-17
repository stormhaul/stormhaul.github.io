"use strict";

var spiro = spiro || {};

spiro.innerCircle = (outerCircle, userInput, renderer, ellipseHelper) => {
    let innerCircle = {};

    innerCircle.init = () => {
        innerCircle.setInputs();
    };

    innerCircle.setInputs = () => {
        innerCircle.iteration = 0;
        innerCircle.max            = Math.min(outerCircle.width, outerCircle.height);
        innerCircle.radius1Percent = parseInt(userInput.getValue('inner-r1')) / 100;
        innerCircle.radius2Percent = parseInt(userInput.getValue('inner-r2')) / 100;
        innerCircle.angle          = parseInt(userInput.getValue('inner-angle')) * Math.PI / 180;
        innerCircle.calculateRadiusPixels();
    };

    innerCircle.calculateRadiusPixels = () => {
        innerCircle.width  = innerCircle.max * innerCircle.radius1Percent / 2;
        innerCircle.height = innerCircle.max * innerCircle.radius2Percent / 2;

        innerCircle.x = outerCircle.x;
        innerCircle.y = outerCircle.y - outerCircle.getRadius(90) + innerCircle.getRadius(90);
    };

    innerCircle.getRadius = (angle) => {
        return ellipseHelper.getRadius(innerCircle.width, innerCircle.height, angle * Math.PI / 180);
    };

    innerCircle.draw = () => {
        console.log(innerCircle);
        renderer.ellipse(innerCircle.x, innerCircle.y, innerCircle.width, innerCircle.height, innerCircle.angle);
    };

    innerCircle.handleUserInputChange = () => {
        console.log('inner change handler');
        innerCircle.setInputs();
        innerCircle.draw();
    };

    userInput.subscribe('innerCircle', innerCircle.handleUserInputChange);
    userInput.subscribe('outerCircle', innerCircle.handleUserInputChange);

    innerCircle.init();

    return innerCircle;
};