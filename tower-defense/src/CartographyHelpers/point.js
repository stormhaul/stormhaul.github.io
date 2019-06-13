"use strict";

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.getVectorMagnitude = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

Point.prototype.getUnitVector = function() {
    let mag = this.getVectorMagnitude();

    return new Point(this.x / mag, this.y / mag);
};

Point.prototype.addPoint = function(point) {
    return new Point(this.x + point.x, this.y + point.y);
};

Point.prototype.mult = function(scalar) {
    return new Point(this.x * scalar, this.y * scalar);
};
