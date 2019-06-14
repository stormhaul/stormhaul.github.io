"use strict";

/**
 * For Conventions, the first vertex is always a point. And it's either at 90degrees or 180 degrees.
 * Points count up in a clockwise direction from there.
 *
 * @param center {Point}
 * @param sideLength {number}
 * @param orientation {string}
 * @constructor
 */
function Hexagon(center, sideLength, orientation = "flat-top") {
    // @todo the rest of the application isn't set up for handling any orientation other than flat top atm.
    if (orientation !== 'flat-top')
        throw new Error('Orientations other than flat top disabled while under development');

    this.center = center;
    this.sideLength = sideLength;
    this.orientation = orientation;
    this.sides = 6;
    this.phi = (360 / this.sides) * Math.PI / 180; // 60 degree angle between spokes of a regular hexagon
    this.radius = this.calculateRadius();
    this.apothem = this.calculateApothem();

    let startAngle = Math.PI;
    switch (orientation) {
        case 'flat-top':
            this.dimensions = this.calculateFlatDimensions();
            break;
        case 'pointed-top':
            startAngle -= Math.PI / 2;
            this.dimensions = this.calculatePointedDimensions();
            break;
        default:
            throw new Error('Invalid Orientation: ' + orientation);
    }

    this.vertices = this.getVertices(startAngle);
}

/**
 * @returns {number}
 */
Hexagon.prototype.getWidth = function() {
    return this.dimensions.width;
};

/**
 * @returns {number}
 */
Hexagon.prototype.getHeight = function() {
    return this.dimensions.height;
};

/**
 * Calculates the width of two nested hexes based on orientation.
 *
 * @returns {number}
 */
Hexagon.prototype.getNestedWidth = function() {
    switch (this.orientation) {
        case 'flat-top': return 2 * this.radius + (this.radius - this.sideLength) / 2;
        case 'pointed-top': return this.apothem / 2;
    }
};

/**
 * Calculates the height of two nested hexes based on orientation.
 *
 * @returns {number}
 */
Hexagon.prototype.getNestedHeight = function() {
    switch (this.orientation) {
        case 'pointed-top': return (this.radius - this.sideLength) / 2;
        case 'flat-top': return this.apothem * 3;
    }
};

/**
 * length of line from centerpoint to midpoint of edge
 * @returns {number}
 */
Hexagon.prototype.calculateApothem = function() {
    return this.radius * Math.cos(this.phi / 2);
};

/**
 * length of line from centerpoint to vertex
 *
 * @returns {number}
 */
Hexagon.prototype.calculateRadius = function() {
    return this.sideLength / Math.sin(this.phi / 2);
};

/**
 * @param startAngle {number} radians
 * @returns {Array: {Point}}
 */
Hexagon.prototype.getVertices = function(startAngle) {
    let vertices = [];

    for (let i = 0; i < 6; i++) {
        vertices.push(this.center.getRadialPointAtDist(startAngle - i * this.phi, this.radius));
    }

    return vertices;
};

/**
 * @returns {Dimensions}
 */
Hexagon.prototype.calculateFlatDimensions = function() {
    return new Dimensions(
        2 * this.radius,
        2 * this.apothem
    );
};

/**
 * @returns {Dimensions}
 */
Hexagon.prototype.calculatePointedDimensions = function() {
    return new Dimensions(
        2 * this.apothem,
        2 * this.radius
    );
};
