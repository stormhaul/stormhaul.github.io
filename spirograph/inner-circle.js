"use strict";

var spiro = spiro || {};

spiro.innerCircle = (outerCircle, userInput, renderer, mathHelper) => {
    let innerCircle = {};

    innerCircle.init = () => {
        innerCircle.rate = parseInt(spiro.config['ellipse']['rate']) * Math.PI / 180;
        innerCircle.setInputs();
    };

    innerCircle.setInputs = () => {
        innerCircle.iteration      = 0;
        innerCircle.max            = outerCircle.radius * 2;
        innerCircle.radius1Percent = parseInt(userInput.getValue('inner-r1')) / 100;
        innerCircle.innerAngle     = 0;
        innerCircle.outerAngle     = (3 * Math.PI / 2) + parseInt(userInput.getValue('inner-angle')) * Math.PI / 180;
        innerCircle.calculateRadiusPixels();
    };

    innerCircle.calculateRadiusPixels = () => {
        innerCircle.radius  = innerCircle.max * innerCircle.radius1Percent / 2;
        innerCircle.circumference = innerCircle.radius * 2 * Math.PI;
        innerCircle.circRatio = outerCircle.circumference / innerCircle.circumference;

        innerCircle.x = outerCircle.x + outerCircle.radius * Math.cos(innerCircle.outerAngle) - innerCircle.radius * Math.cos(innerCircle.outerAngle);
        innerCircle.y = outerCircle.y + outerCircle.radius * Math.sin(innerCircle.outerAngle) - innerCircle.radius * Math.sin(innerCircle.outerAngle);
    };

    innerCircle.getPoint = (angle) => {
        return mathHelper.convertPolarCoordinate(innerCircle.radius, angle);
    };

    innerCircle.draw = () => {
        renderer.ellipse(innerCircle.x, innerCircle.y, innerCircle.radius, innerCircle.radius, 0);
    };

    innerCircle.handleUserInputChange = () => {
        innerCircle.setInputs();
        innerCircle.draw();
    };

    innerCircle.rotate = () => {
        innerCircle.outerAngle += outerCircle.deltaAngle;
        innerCircle.innerAngle += innerCircle.circRatio * outerCircle.deltaAngle;

        innerCircle.calculateRadiusPixels();
    };

    userInput.subscribe('innerCircle', innerCircle.handleUserInputChange);
    userInput.subscribe('outerCircle', innerCircle.handleUserInputChange);

    innerCircle.init();

    return innerCircle;
};