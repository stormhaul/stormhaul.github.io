"use strict";

var tc = tc || {};

tc.vector = (x, y) => {
    let v = {};

    v.x = x;
    v.y = y;

    v.getMagnitude = () => {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

    v.getUnitVector = () => {
        let mag = v.getMagnitude();

        return tc.vector(v.x / mag, v.y / mag);
    };

    v.getLeftPerpendicularVector = () => {
        return tc.vector(v.y, -v.x);
    };

    v.getRightPerpendicularVector = () => {
        return tc.vector(-v.y, v.x);
    };

    v.add = (v1) => {
        return tc.vector(v.x + v1.x, v.y + v1.y);
    };

    v.sub = (v1) => {
        return tc.vector(v.x - v1.x, v.y - v1.y);
    };

    v.mult = (c) => {
        return tc.vector(v.x * c, v.y * c);
    };

    /**
     * Give a start and end point for a line to displace along.
     * Give the position to base the displacement from.
     * Give the value of displacement positive or negative.
     * Returns the position where you've been displaced to.
     *
     * @param start {tc.vector}
     * @param end {tc.vector}
     * @param displacement {number}
     * @returns {tc.vector}
     */
    v.getOrthogonalDisplacement = (start, end, displacement) => {
        return end.sub(start).getUnitVector().getLeftPerpendicularVector().mult(displacement).add(v);
    };

    /**
     * @param start
     * @param end
     * @param displacement
     * @returns {v}
     */
    v.getPointAlong = (start, end, displacement) => {
        return end.sub(start).getUnitVector().mult(displacement).add(v);
    };

    return v;
};