"use strict";

var spiro = spiro || {};

spiro.init = () => {
    let userInput = spiro.userInput();
    let outerCircle = spiro.outerCircle(userInput);
    let innerCircle = spiro.innerCircle(outerCircle, userInput);
    console.log(userInput);
};

window.onload = () => {
    spiro.init();
};