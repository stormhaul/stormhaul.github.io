"use strict";

var spiro = spiro || {};

spiro.init = () => {
    let renderer  = spiro.renderer();
    let userInput = spiro.userInput();
    let mathHelper = spiro.mathHelper();
    let ellipseHelper = spiro.ellipseHelper(mathHelper);
    let outerCircle = spiro.outerCircle(userInput, renderer, ellipseHelper);
    let innerCircle = spiro.innerCircle(outerCircle, userInput, renderer, ellipseHelper);

    console.log(userInput);

    outerCircle.draw();
    innerCircle.draw();
};

window.onload = () => {
    spiro.init();
};