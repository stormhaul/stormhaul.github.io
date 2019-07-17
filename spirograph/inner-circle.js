"use strict";

var spiro = spiro || {};

spiro.innerCircle = (outerCircle, userInput) => {
    let innerCircle = {};

    innerCircle.handleUserInputChange = () => {
        console.log('inner change handler');
    };

    userInput.subscribe('innerCircle', innerCircle.handleUserInputChange);
    userInput.subscribe('outerCircle', innerCircle.handleUserInputChange);

    return innerCircle;
};