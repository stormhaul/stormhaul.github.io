"use strict";

var vs = vs || {};

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

    point.dist = (p) => {
        return Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2));
    };

    point.rectangleArea = (p1, p2) => {
        return point.dist(p1) * point.dist(p2);
    };

    point.triangleArea = (p1, p2) => {
        let a = point.dist(p1);
        let c = point.dist(p2);
        let theta = Math.acos(a/2/c);
        return 1/2 * a/2 * (c * Math.sin(theta));
    };

    return point;
};