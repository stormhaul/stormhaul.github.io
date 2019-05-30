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
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});