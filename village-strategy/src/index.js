"use strict";

var vs = vs || {};

vs.init = () => {
    let renderer = vs.renderer();
    let v1 = vs.village(vs.point(200, 200), 10, 1);
    let v2 = vs.village(vs.point(300, 300), 10, 0);
    let v3 = vs.village(vs.point(400, 400), 10, 2);
    let v4 = vs.village(vs.point(500, 500), 10, 3);

    let ms = vs.mouseInput();
    let villages = [v1,v2,v3,v4];
    villages.map((v) => {
        ms.makeSelectable(v.clickSelectHandler, v.boxSelectHandler);
    });

    v3.select();

    let iterate = function() {
        villages.map((v) => {
            v.grow();
            v.register();
        });
        renderer.drawFrame();
    };

    vs.loop(iterate);
};

vs.loop = (iterate) => {
    iterate();

    setTimeout(() => {
        vs.loop(iterate);
    }, 50);
};

document.addEventListener("DOMContentLoaded", function() {
    vs.init();
});
