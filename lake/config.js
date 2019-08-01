"use strict";

var l = l || {};

l.config = {
    canvas: {
        id: 'canvas',
        width: window.innerWidth,
        height: window.innerHeight
    },
    light: {
        radius: 500
    },
    plants: {
        lily: {
            color: "#006633"
        }
    },
    fish: {
        color: "#FF9933",
        maxVeloctity: 1,
        slowDistance: 50,
        stopDistance: 40,
        randomAngleRange: 30,
        flockSpacing: 10
    },
    shadows: {
        color: "#000",//"#888888",
        offset: (position, cursorPosition) => {
            let unit = l.helper.getUnitVectorBetweenTwoPoints(position, cursorPosition);

            return {
                x: position.x - 100 * unit.x,
                y: position.y - 100 * unit.y
            }
        }
    }
};