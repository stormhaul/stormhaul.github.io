"use strict";

var spiro = spiro || {};

spiro.outerCircle = (userInput, renderer, mathHelper) => {
    let outerCircle = {};

    outerCircle.init = () => {
        outerCircle.setInputs();
    };

    outerCircle.setInputs = () => {
        outerCircle.max            = Math.min(renderer.canvas.width, renderer.canvas.height);
        outerCircle.radius1Percent = parseInt(userInput.getValue('outer-r1')) / 100;
        outerCircle.calculateRadiusPixels();
    };

    outerCircle.calculateRadiusPixels = () => {
        outerCircle.x = renderer.canvas.width / 2;
        outerCircle.y = renderer.canvas.height / 2;

        outerCircle.radius = outerCircle.max * outerCircle.radius1Percent / 2;
        outerCircle.circumference = outerCircle.radius * 2 * Math.PI;
        outerCircle.chunkLength = outerCircle.circumference / parseInt(spiro.config['ellipse']['chunks']);
        outerCircle.deltaAngle = mathHelper.getAngleFromCircumferenceAndArcLength(outerCircle.circumference, outerCircle.chunkLength);
    };

    outerCircle.getPoint = (angle) => {
        return mathHelper.convertPolarCoordinate(outerCircle.r, angle);
    };

    outerCircle.draw = () => {
        renderer.ellipse(outerCircle.x, outerCircle.y, outerCircle.radius, outerCircle.radius, 0);
    };

    outerCircle.handleUserInputChange = () => {
        console.log('outer changed handler');
        outerCircle.setInputs();
        outerCircle.draw();
    };

    userInput.subscribe('outerCircle', outerCircle.handleUserInputChange);

    outerCircle.init();

    return outerCircle;
};