"use strict";

function init() {
    let r = new Renderer();

    let d = new DicePool();
    d.addDie(2);
    d.addDie(3);
    d.addDie(4);
    d.addDie(5);
    d.addDie(20);
    d.addDie(20);
    d.addDie(20);

    console.log(d.roll());

    let p = new Perspective(r, {x: 0, y: 0}, 60 * Math.PI / 180, 200);
    let mapFactory = new MapFactory();
    let map = mapFactory.buildMap({element: document.getElementById('background'), width: 1200, height: 600, pixelsPerUnit: 100}, 'square');

    map.render(p);

    r.addRenderable(map);

    document.addEventListener('rerender', function() {
        r.render(p);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});