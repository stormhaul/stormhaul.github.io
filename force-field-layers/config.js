var ffl = ffl || {};

ffl.config = {
    CANVAS_ID: 'canvas',
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    DEFAULT_LINE_COLOR: 'white',

    particles: {
        color: 'rgba(255, 255, 255, .5)',
        radius: 3,
        MAX_PARTICLES: 2000,
        resistance: .99
    },
    forces: {
        minX: -1,
        minY: -1,
        maxX: 1,
        maxY: 1
    },
    ACCELERATION_FACTOR: .5 // Rate of acceleration modified
};
