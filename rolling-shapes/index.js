"use strict";

let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
let ctx = applyQoLFunctions(canvas.getContext('2d'));
let total = 0;
let MAX_SHAPE_SIDES = 12;
let CURRENT_COLOR = [255, 255, 255];
let TARGET_COLOR = [255, 255, 255];
let TARGET_COUNT = 1000;
let COUNT = 0;
let STEP = 1;
let SIDE_LENGTH = 100;
let SHOW_PIVOT = false;

function init() {
    let center = [canvas.width / 2, canvas.height / 2];
    let sideLength = SIDE_LENGTH;
    let shapes = [];
    for (let i = 3; i <= MAX_SHAPE_SIDES; i++) {
        let wrapped = null;
        if (shapes[shapes.length-1]) {
            wrapped = shapes[shapes.length-1];
        }
        shapes.push(new Shape(center, i, sideLength));

        if (wrapped) {
            wrapped.wrapper = shapes[shapes.length - 1];
        }
    }

    for (let i = 0; i < shapes.length; i++) {
        let next = typeof(shapes[i+1]) !== 'undefined' ? shapes[i+1] : null;
        let cur = shapes[i];
        if (next) {
            next.shift([0, -(cur.radius - next.radius)]);
        }
    }

    console.log(shapes, ...(shapes.map((item) => item.getLinesPoints())));
    loop(shapes);
}

function loop(shapes) {
    requestAnimationFrame(() => {loop(shapes);});
    update(shapes);
    render(shapes);
}

function update(shapes) {
    if (COUNT % TARGET_COUNT === 0) {
        TARGET_COLOR = generateRandomColorVector();
    }

    if (total !== 0 && 360 - total < .0000001) {
        shapes.map(shape => shape.changePivot());
        total = 0;
    }

    let step = STEP;
    shapes.map(shape => shape.rotateAroundPivot(step));
    total += step;
    COUNT++;
    CURRENT_COLOR = stepTowardsTarget(CURRENT_COLOR, TARGET_COLOR);
}

function render(shapes) {
    ctx.clear();
    shapes.map((shape) => {
        let opacity = (MAX_SHAPE_SIDES - shape.sides) / MAX_SHAPE_SIDES * .5 + .5;
        let lineOct = CURRENT_COLOR[0] + ',' + CURRENT_COLOR[1] + ',' + CURRENT_COLOR[2] + ',';
        ctx.lines(shape.getLinesPoints(), 'rgba(' + lineOct + opacity + ')');
        if (SHOW_PIVOT) {
            ctx.dot(shape.center, 5, 'rgba(0, 0, 255, ' + opacity + ')');
            ctx.dot(shape.vertices[shape.pivot], 5, 'rgba(255, 0, 0, ' + opacity + ')');
        }
    });
}

function applyQoLFunctions(ctx) {
    ctx.lines = (points, color = 'white', join = 'round') => {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineJoin = join;
        ctx.strokeStyle = color;
        for (let i in points) {
            if (i == 0) {
                ctx.moveTo(...points[i]);
            } else {
                ctx.lineTo(...points[i]);
            }
        }
        ctx.stroke();
    };

    ctx.dot = (center, radius = 5, color = 'red') => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
        ctx.fill();
    };

    ctx.clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return ctx;
}

/**
 * @param start array [x, y]
 * @param angle degrees
 * @param radius number
 * @returns {*[]}
 */
function pointAlongRadius(start, angle, radius) {
    return [
        start[0] + Math.cos(angle * Math.PI / 180) * radius,
        start[1] + Math.sin(angle * Math.PI / 180) * radius
    ]
}

function addPoints(p1, p2) {
    return [
        p1[0] + p2[0],
        p1[1] + p2[1]
    ];
}

function rotateAround(p1, center, angle) {
    let a = angle * Math.PI / 180;
    let diffX = (p1[0] - center[0]);
    let diffY = (p1[1] - center[1]);
    return [
        Math.cos(a) * diffX - Math.sin(a) * diffY + center[0],
        Math.sin(a) * diffX + Math.cos(a) * diffY + center[1]
    ];
}

function Shape(center, sides, sideLength) {
    this.center        = center;
    this.sides         = sides;
    this.sideLength    = sideLength;
    this.interiorAngle = (this.sides - 2) * 180 / this.sides;
    this.centerAngle   = 180 - this.interiorAngle;
    this.radius        = this.sideLength / (2 * Math.sin(Math.PI / this.sides));
    this.vertices      = (() => {
        let points = [];
        for(let angle = -90; angle <= 270; angle += this.centerAngle) {
            points.push(pointAlongRadius(this.center, angle, this.radius));
        }

        return points;
    })();
    this.wrapper = null;
    this.pivot = 0;
}

Shape.prototype.getLinesPoints = function() {
    let arr = JSON.parse(JSON.stringify(this.vertices));
    arr.push(this.vertices[0]);
    return arr;
};

Shape.prototype.shift = function(vector, parentVector = [0, 0]) {
    let total = addPoints(vector, parentVector);
    this.center = addPoints(this.center, total);
    this.vertices = this.vertices.map(item => addPoints(item, total));
    if (this.wrapper) {
        this.wrapper.shift(vector, parentVector);
    }
};

Shape.prototype.rotateAroundPivot = function(degrees) {
    let pivot     = this.vertices[this.pivot % this.vertices.length];
    this.center   = rotateAround(this.center, pivot, degrees);
    this.vertices = this.vertices.map(
        item => rotateAround(item, pivot, degrees)
    );
    if (this.wrapper) {
        this.wrapper.rotateAroundPivot(degrees);
    }
};

Shape.prototype.changePivot = function() {
    this.pivot = (this.pivot + 1) % this.vertices.length;
};

function generateRandomColorVector(brightness = 1) {
    let out = [
        Math.random() * 255 * brightness,
        Math.random() * 255 * brightness,
        Math.random() * 255 * brightness
    ];

    if (out[0] + out[1] + out[2] < 200) {
        //too dark, try again
        return generateRandomColorVector(brightness);
    }
    return out;
}

function stepTowardsTarget(v, target) {
    let step = 1;

    let out = [];
    for (let i in v) {
        let diff = target[i] - v[i];
        if (diff < 0) {
            out.push(v[i] - step);
        } else if (diff > 0) {
            out.push(v[i] + step);
        } else {
            out.push(v[i]);
        }
    }

    return out;
}

init();