"use strict";

var spiro = spiro || {};

spiro.init = () => {
    let renderer  = spiro.renderer();
    let userInput = spiro.userInput();
    let outerCircle = spiro.outerCircle(userInput, renderer);
    let innerCircle = spiro.innerCircle(outerCircle, userInput);
    console.log(userInput);

    outerCircle.draw();
};

window.onload = () => {
    spiro.init();
};