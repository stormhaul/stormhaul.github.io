"use strict";

var spiro = spiro || {};

spiro.init = () => {
    let renderer  = spiro.renderer();
    let userInput = spiro.userInput();
    let mathHelper = spiro.mathHelper();
    let outerCircle = spiro.outerCircle(userInput, renderer, mathHelper);
    let innerCircle = spiro.innerCircle(outerCircle, userInput, renderer, mathHelper);
    let spiral = spiro.spiral(renderer, userInput);
    let marker = spiro.marker(innerCircle, outerCircle, renderer, mathHelper, userInput, spiral);


    let controller = spiro.controller(renderer, userInput, outerCircle, innerCircle, spiral, marker);
    controller.loop();
};

window.onload = () => {
    spiro.init();
};