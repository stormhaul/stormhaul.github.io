"use strict";

var tc = tc || {};

tc.init = () => {

    // const app = new PIXI.Application();
    //
    // document.body.appendChild(app.view);
    //
    // app.loader.add('', '').load((loader, resources) => {});
    let time = 0;
    let play = () => {
        console.log(time);
        //temporary game logic controller, should define new one
        dots.children.forEach((dot) => {
            let displaced = dot.origin.getOrthogonalDisplacement(dot.v1, dot.v2, sinWaveFunc(dot.offsetDistance, dot.totalOffsetDistance, time));
            dot.x = displaced.x;
            dot.y = displaced.y;
        });

        time++;
    };

    let g = tc.engine(play);

    let cells = g.group();
    cells.addChild(tc.cell(g));
    cells.addChild(tc.cell(g));
    cells.addChild(tc.cell(g));

    let cellLen = cells.children.length;
    let lines = g.group();
    cells.children.forEach((cell, index) => {
        let nextCell = cells.children[(index + 1) % cellLen];
        lines.addChild(g.line('white', 10, cell.cx, cell.cy, nextCell.cx, nextCell.cy));
    });

    let sinWaveFunc = tc.fixedEndSinWave(200, 3, 2);
    let dots = g.group();

    lines.children.forEach((line) => {
        let v1 = tc.vector(line.ax, line.ay);
        let v2 = tc.vector(line.bx, line.by);
        let distance = v2.sub(v1).getMagnitude();

        for (let i = 100; i < distance; i+= 100) {
            let s = v1.getPointAlong(v1, v2, i);
            let displaced = s.getOrthogonalDisplacement(v1, v2, sinWaveFunc(i, distance, time));
            let circle = g.circle(50, 'blue', 'white', 10, displaced.x, displaced.y);
            circle.origin = s;
            circle.offsetDistance = i;
            circle.totalOffsetDistance = distance;
            circle.v1 = v1;
            circle.v2 = v2;

            dots.addChild(circle);
        }
    });
    g.start();
};

window.onload = () => {
    tc.init();
};