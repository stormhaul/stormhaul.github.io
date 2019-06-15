"use strict";

function init() {
    let canvas = document.getElementById('c');
    canvas.width = 1000;
    canvas.height = canvas.width * window.innerHeight / window.innerWidth;

    let ctx = canvas.getContext('2d');

    ctx.wipe = function() {
        ctx.fillStyle = 'white';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    };

    /**
     * @param hexagon {Hexagon}
     */
    ctx.drawHex = function(hexagon) {
        ctx.beginPath();
        for (let i = 0; i < hexagon.sides; i++) {
            let cur = hexagon.vertices[i];
            let next = hexagon.vertices[(i+1) % hexagon.sides];

            ctx.moveTo(cur.x, cur.y);
            ctx.lineTo(next.x, next.y);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // ctx.beginPath();
        // for (let i = 0; i < hexagon.sides; i++) {
        //     let cur = hexagon.vertices[i];
        //     let next = hexagon.vertices[(i+1) % hexagon.sides];
        //
        //     ctx.moveTo(cur.x, cur.y);
        //     ctx.lineTo(next.x, next.y);
        // }
        //
        // ctx.stroke();
    };

    let grid = new Grid(canvas.width, canvas.height, 50, new ConwaysRules());

    grid.cells[0][0].revive();
    grid.cells[1][0].revive();
    grid.cells[1][1].revive();

    // grid.iterate(ctx);
    // grid.iterate(ctx);

    let cell = new Cell(1,1, false, new Hexagon(new Point(100, 100), 50));
    cell.revive();
    console.log(cell);
    cell.render(ctx);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});