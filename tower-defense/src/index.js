"use strict";

function init() {
    let grid = new Grid();
    let camera = new Camera();
    let renderer = new Renderer();
}

function loop() {
    requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});