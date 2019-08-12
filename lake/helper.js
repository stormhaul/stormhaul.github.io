"use strict";

var l = l || {};

l.helper = {
    getRadialVector: (distance, theta) => {
        return {
            x: distance * Math.cos(theta),
            y: distance * Math.sin(theta)
        }
    },
    getCartesianDistance: (p1, p2) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },
    getTheta: (p1, p2) => {
        return Math.atan2(
            p2.y - p1.y,
            p2.x - p1.x
        );
    },
    log: function() {
        for (let i in arguments) {
            let a = arguments[i];
            console.log(JSON.parse(JSON.stringify(a)));
        }
    },
    getUnitVectorBetweenTwoPoints: (p1, p2) => {
        let v = {x: p2.x - p1.x, y: p2.y - p1.y};
        let mag = Math.sqrt(v.x * v.x + v.y * v.y);

        return {
            x: v.x / mag,
            y: v.y / mag
        };
    },
    getRandom: (min, max) => {
        let diff = max - min;
        return Math.floor(Math.random() * diff + min);
    }
};
