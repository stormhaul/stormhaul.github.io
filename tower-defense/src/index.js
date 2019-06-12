"use strict";

function init() {
    let grid = new Grid();
    let renderer = new Renderer();
    let camera = new Camera(renderer);
    let keyboard = new Keyboard();
    let mouse = new Mouse(camera);

    renderer.addRenderable(1, grid);

    camera.requestFrame()

    loop(camera, keyboard, mouse);
}

function loop(camera, keyboard, mouse) {
    requestAnimationFrame(function() {
        loop(camera, keyboard, mouse);
    });

    let vector = new Point(0,0);
    if (keyboard.up()) {
        vector.y -= 1;
    }
    if (keyboard.down()) {
        vector.y += 1;
    }
    if (keyboard.left()) {
        vector.x -= 1;
    }
    if (keyboard.right()) {
        vector.x += 1;
    }

    camera.scroll(vector);

    camera.requestFrame();
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});