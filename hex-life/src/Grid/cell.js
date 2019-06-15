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

    let that = this;
    document.addEventListener('nextTurn', function() {
        that.previous = that.state;
    });
}

Cell.prototype.kill = function() {
    this.state = false;
};

Cell.prototype.revive = function() {
    this.state = true;
};

Cell.prototype.render = function(ctx) {
    ctx.fillStyle = this.state ? 'white' : 'black';
    ctx.strokeStyle = 'white';

    ctx.drawHex(this.hexagon);
};
