"use strict";

var spiro = spiro || {};

spiro.init = () => {
    let renderer  = spiro.renderer();
    let userInput = spiro.userInput();
    let mathHelper = spiro.mathHelper();
    let outerCircle = spiro.outerCircle(userInput, renderer, mathHelper);
    let innerCircle = spiro.innerCircle(outerCircle, userInput, renderer, mathHelper);

    console.log(userInput);

    outerCircle.draw();
    innerCircle.draw();
};

window.onload = () => {
    spiro.init();
};