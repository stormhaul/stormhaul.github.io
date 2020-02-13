var ffl = ffl || {};

ffl.index = function () {
    let i = {};

    i.ctx = ffl.context();
    i.map = ffl.map(i.ctx);

    i.init = function () {
        document.addEventListener('click', i.map.generateForces);
        i.loop();
    };

    i.loop = function () {
        requestAnimationFrame(() => {i.loop()});
        i.update();
        i.render();
    };

    i.update = function () {
        i.map.update();
    };

    i.render = function () {
        i.map.render();
    };

    return i;
};

window.onload = () => {
    ffl.index().init();
};