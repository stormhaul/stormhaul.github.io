"use strict";

let vs = vs || {};

vs.point = (x, y) => {
    let point = {};

    point.x = x;
    point.y = y;

    /**
     * Returns the centerpoint between a point and 1-n other points
     * @param points
     */
    point.middleOf = (...points) => {
        let x = point.x;
        let y = point.y;

        points.map((p) => {
            x += p.x;
            y += p.y;
        });

        x /= points.length + 1;
        y /= points.length + 1;

        return vs.point(x, y);
    };

    return point;
};