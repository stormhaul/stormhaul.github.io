"use strict";

var vs = vs || {};

vs.init = () => {
    let renderer = vs.renderer();
    let v1 = vs.village(vs.point(20, 20), 10, 1);
    let v2 = vs.village(vs.point(30, 30), 10, 0);
    let v3 = vs.village(vs.point(40, 40), 10, 2);
    let v4 = vs.village(vs.point(50, 50), 10, 3);
    v1.register();
    v2.register();
    v3.register();
    v4.register();
    renderer.drawFrame();
};

document.addEventListener("DOMContentLoaded", function() {
    vs.init();
});
