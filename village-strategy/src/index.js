"use strict";

var vs = vs || {};

vs.init = () => {
    let renderer = vs.renderer();
    let v1 = vs.village(vs.point(200, 200), 10, 1);
    let v2 = vs.village(vs.point(300, 300), 10, 0);
    let v3 = vs.village(vs.point(400, 400), 10, 2);
    let v4 = vs.village(vs.point(500, 500), 10, 3);
    v1.register();
    v2.register();
    v3.register();
    v4.register();
    renderer.drawFrame();
};

document.addEventListener("DOMContentLoaded", function() {
    vs.init();
});
