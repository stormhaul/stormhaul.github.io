"use strict";

/**
 * @param x {int}
 * @param y {int}
 * @param isEdge {boolean}
 * @param hex {Hexagon}
 * @constructor
 */
function Cell(x, y, isEdge, hex) {
    this.x = x;
    this.y = y;
    this.state = false;
    this.previous = false;
    this.isEdge = isEdge;
    this.hexagon = hex;
	this.color = 'black';

    let that = this;
    document.addEventListener('nextTurn', function() {
		that.color = that.getColor();
        that.previous = that.state;
    });
}

Cell.prototype.kill = function() {
    this.state = false;
};

Cell.prototype.revive = function() {
    this.state = true;
};

Cell.prototype.getColor = function() {
	if (this.state != this.previous) {
		if (this.state == 1) {
			//lighter color
			return '#aaaaaa';
		}
		//darker color
		return '#444444';
	}

	return this.state ? 'white' : 'black';
}

Cell.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';

    ctx.drawHex(this.hexagon);
};
