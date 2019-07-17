"use strict";

var spiro = spiro || {};

spiro.outerCircle = (userInput) => {
    let outerCircle = {};

    outerCircle.handleUserInputChange = () => {
        console.log('outer changed handler');
    };

    userInput.subscribe('outerCircle', outerCircle.handleUserInputChange);

    return outerCircle;
};