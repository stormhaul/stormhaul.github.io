"use strict";

function init() {
    let canvas = document.getElementById('c');
    canvas.width = 1000;
    canvas.height = canvas.width * window.innerHeight / window.innerWidth;

    let ctx = canvas.getContext('2d');

    ctx.wipe = function() {
        ctx.fillStyle = 'black';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    };

    /**
     * @param hexagon {Hexagon}
     */
    ctx.drawHex = function(hexagon) {
        this.beginPath();
		let cur = hexagon.vertices[0];
		this.moveTo(cur.x, cur.y)
        for (let i = 1; i < hexagon.sides; i++) {
            let cur = hexagon.vertices[i];

            this.lineTo(cur.x, cur.y);
        }

        this.closePath();
        this.fill();
        this.stroke();

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

    let grid = new Grid(canvas.width, canvas.height, 10, new ConwaysRules());

    grid.cells[0][0].revive();
    grid.cells[1][0].revive();
    grid.cells[1][1].revive();
    grid.cells[2][2].revive();
	document.dispatchEvent(new Event('nextTurn'));

	let func = function() {
		setTimeout(function(){requestAnimationFrame(func)}, 200);
		// requestAnimationFrame(func);

		grid.iterate(ctx);
	}
	requestAnimationFrame(func);

    // let cell = new Cell(1,1, false, new Hexagon(new Point(100, 100), 50));
    // cell.revive();
    // console.log(cell);
    // cell.render(ctx);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});
