"use strict";

function init() {
    let renderer = new Renderer();
    let camera = new Camera(renderer);
    let keyboard = new Keyboard();
    let mouse = new Mouse(camera);

    let grid = new Grid(renderer.getRenderableId());
    let tower = new Tower(renderer.getRenderableId(), new Point(26, 26));
    let enemy = new Enemy(renderer.getRenderableId(), [new Point(20,20), new Point(50,50)], 1);
    enemy.position = new Point(100, 100);

    renderer.addRenderable(grid);
    renderer.addRenderable(tower);
    renderer.addRenderable(enemy);

    tower.attack([enemy], renderer);

    camera.requestFrame();

    mouse.addSubscriber(LEFTCLICK, grid);

    loop(camera, keyboard, mouse, tower, enemy, renderer);
}

function loop(camera, keyboard, mouse, tower, enemy, renderer) {
    requestAnimationFrame(function() {
        loop(camera, keyboard, mouse, tower, enemy, renderer);
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

    tower.attack([enemy], renderer);

    camera.requestFrame();
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});