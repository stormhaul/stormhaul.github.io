"use strict";

var spiro = spiro || {};

spiro.outerCircle = (userInput, renderer, ellipseHelper) => {
    let outerCircle = {};

    outerCircle.init = () => {
        outerCircle.setInputs();
    };

    outerCircle.setInputs = () => {
        outerCircle.max            = Math.min(renderer.canvas.width, renderer.canvas.height);
        outerCircle.radius1Percent = parseInt(userInput.getValue('outer-r1')) / 100;
        outerCircle.radius2Percent = parseInt(userInput.getValue('outer-r2')) / 100;
        outerCircle.angle          = parseInt(userInput.getValue('outer-angle')) * Math.PI / 180;
        outerCircle.calculateRadiusPixels();
    };

    outerCircle.calculateRadiusPixels = () => {
        outerCircle.x = renderer.canvas.width / 2;
        outerCircle.y = renderer.canvas.height / 2;

        outerCircle.width  = outerCircle.max * outerCircle.radius1Percent / 2;
        outerCircle.height = outerCircle.max * outerCircle.radius2Percent / 2;
    };

    outerCircle.getRadius = (angle) => {
        return ellipseHelper.getRadius(outerCircle.width, outerCircle.height, angle * Math.PI / 180);
    };

    outerCircle.draw = () => {
        renderer.ellipse(outerCircle.x, outerCircle.y, outerCircle.width, outerCircle.height, outerCircle.angle);
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