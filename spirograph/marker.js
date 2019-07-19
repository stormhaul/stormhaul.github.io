"use strict";

var spiro = spiro || {};

spiro.marker = (innerCircle, outerCircle, renderer, mathHelper, userInput, spiral) => {
    let marker = {};

    marker.init = () => {
        marker.handleUserInputChange();
    };

    marker.handleUserInputChange = () => {
        marker.startAngles = {
            inner: innerCircle.innerAngle,
            outer: innerCircle.outerAngle
        };

        //emitt restarted animation
        document.dispatchEvent(new Event('restart'));

        marker.interiorAngle = parseInt(userInput.getValue('rotation')) * Math.PI / 180;
        marker.radius = innerCircle.radius * (1 - (parseInt(userInput.getValue('inset')) / 100));
        marker.color = userInput.getValue('color');

        marker.updatePoint();
        marker.draw();
    };

    marker.updatePoint = () => {
        let coord = mathHelper.convertPolarCoordinate(marker.radius, marker.interiorAngle + innerCircle.innerAngle);
        marker.x = innerCircle.x + coord.x;
        marker.y = innerCircle.y + coord.y;
    };

    marker.rotate = () => {
        innerCircle.rotate();

        marker.updatePoint();
        spiral.addPoint({x: marker.x, y: marker.y});

        if (mathHelper.areAnglesEquivalent(innerCircle.innerAngle, marker.startAngles.inner) && mathHelper.areAnglesEquivalent(innerCircle.outerAngle, marker.startAngles.outer)) {
            //emitt finish animation
            document.dispatchEvent(new Event('finish'));
        }
    };

    marker.draw = () => {
        renderer.marker(marker.x, marker.y, userInput.getValue('color'));
    };

    userInput.subscribe('marker', marker.handleUserInputChange);
    userInput.subscribe('innerCircle', marker.handleUserInputChange);
    userInput.subscribe('outerCircle', marker.handleUserInputChange);

    marker.init();

    return marker;
};