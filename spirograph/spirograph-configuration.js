"use strict";

var spiro = spiro || {};

spiro.config = {
    canvasId: 'c',
    ellipse: {
        lineWidth: 1,
        lineColor: 'white'
    },
    spiral: {
        lineWidth: 1,
        lineColor: 'purple',
        lineJoin: 'round'
    },
    userInput: {
        outerCircle: {
            r1Id: 'outer-r1',
            r2Id: 'outer-r2',
            angleId: 'outer-angle'
        },
        innerCircle: {
            r1Id: 'inner-r1',
            r2Id: 'inner-r2',
            angleId: 'inner-angle'
        },
        marker: {
            insetId: 'inset',
            rotationId: 'rotation',
            colorId: 'color'
        }
    }
};