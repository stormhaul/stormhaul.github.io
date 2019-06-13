"use strict";

/**
 * @param a {Point}
 * @param b {Point}
 * @return {number}
 */
function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

/**
 * @param a {Point}
 * @param b {Point}
 * @return {number}
 */
function blockDistance(a, b) {
    return Math.abs(Math.floor(b.x) - Math.floor(a.x)) + Math.abs(Math.floor((b.y)) - Math.floor((b.y)));
}

/**
 * @param start {Point}
 * @param end {Point}
 * @param distance {number}
 * @returns {Point}
 */
function pointTowardsPosition(start, end, distance) {
    let delta = new Point(end.x - start.x, end.y - start.y).getUnitVector().mult(distance);

    return start.addPoint(delta);
}
