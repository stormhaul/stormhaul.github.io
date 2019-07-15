"use strict";

var CW = 1000;
var CH = CW * getAspectRatio();
var SH = 15;
var LINES = function() {
    let lines = {};

    lines.sets = [];

    lines.add = function(set) {
        this.sets.push(set);
    };

    lines.get = function(setId) {
        return this.sets[setId];
    };

    lines.len = function() {
        return this.sets.length;
    };

    return lines;
}();

var SETS = 6;

function getAspectRatio() {
    return window.innerHeight / window.innerWidth;
}

function updateDimensions() {
    CH = CW * getAspectRatio();
    canvas.width = CW;
    canvas.height = CH;
}

window.addEventListener('onResize', updateDimensions);

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
updateDimensions();

/**
 * @param x int
 * @param y int
 * @returns {{x: *, y: *}}
 * @constructor
 */
function Point(x, y) {
    let point = {x: x, y: y};

    /**
     * @param p Point
     * @returns {{x: *, y: *}}
     */
    point.sub = function (p) {
        return new Point(p.x - this.x, p.y - this.y);
    };

    /**
     * @param p Point
     * @returns {{x: *, y: *}}
     */
    point.add = function (p) {
        return new Point(p.x + this.x, p.y + this.y);
    };

    /**
     * @param c float
     * @returns {{x: *, y: *}}
     */
    point.div = function (c) {
        return new Point(this.x / c, this.y / c);
    };

    /**
     * @param c float
     * @returns {{x: *, y: *}}
     */
    point.mult = function (c) {
        return new Point(this.x * c, this.y * c);
    };

    /**
     * @param degrees
     * @returns {{x: *, y: *}}
     */
    point.rotate = function (degrees) {
        let rads = degrees * Math.PI / 180;
        let cur  = Math.atan2(this.y, this.x);

        let final = rads + cur;
        let hyp   = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        return new Point(
            Math.cos(final) * hyp,
            Math.sin(final) * hyp
        );
    };

    return point;
}

/**
 * @param start
 * @param end
 * @returns {{start: *, end: *}}
 * @constructor
 */
function KochLine(start, end) {
    let line = {start: start, end: end};

    line.a = function() {
        return this.start;
    };

    line.b = function() {
        let v = this.start.sub(this.end);
        v = v.div(8);
        v = v.add(this.start);
        return v;
    };

    line.c = function(evenOdd) {
        let v = this.start.sub(this.end);
        v = v.mult(3/4);
        let a = Math.acos(1/2) * 180 / Math.PI;
        let angle = evenOdd ? a : -a;
        v = v.rotate(angle);

        let b = this.b();

        return b.add(v);
    };

    line.d = function() {
        let v = this.start.sub(this.end);
        v = v.mult(7/8);
        v = v.add(start);
        return v;
    };

    line.e = function() {
        return this.end;
    };

    return line;
}

ctx.wipe = function() {
    this.clearRect(0, 0, CW, CH);
};

/**
 * Wrapper function to create joined lines with ctx easily.
 *
 * @param lines Array(KochLine)
 * @param color string
 * @param lineWidth int
 */
ctx.line = function(lines, color = 'white', lineWidth = 1) {
    this.beginPath();
    this.strokeStyle = color;
    this.lineWidth = 1;
    this.lineJoin = 'bevel';

    lines.map((line, index) => {
        if (index == 0) {
            this.moveTo(line.start.x, line.start.y);
        } else {
            this.lineTo(line.start.x, line.start.y);
        }

        this.lineTo(line.end.x, line.end.y);
    });

    this.stroke();
};

function initializeLines() {
    // let start = new Point(0, CH - SH),
    //     end   = new Point(CW, CH - SH);
    //
    // LINES.add([new KochLine(start, end)]);

    let cX = CW / 2;
    let cY = CH / 2;
    let min = Math.min(CW, CH);
    let halfLen = (min - 250) / 2;

    // let s1 = new Point(cX - halfLen, cY - halfLen),
    //     s2 = new Point(cX + halfLen, cY - halfLen),
    //     s3 = new Point(cX + halfLen, cY + halfLen),
    //     s4 = new Point(cX - halfLen, cY + halfLen);
    //
    // LINES.add([
    //     new KochLine(s1, s2),
    //     new KochLine(s2, s3),
    //     new KochLine(s3, s4),
    //     new KochLine(s4, s1),
    // ]);

    let points = getPointsOfOctogon();
    let lines = [];
    points.map((p, index) => {
        lines.push(new KochLine(p, points[(index + 1) % points.length]));
    });

    LINES.add(lines);
}

function getPointsOfOctogon() {
    let desiredHeight = (Math.min(CW, CH) - 30) / 2;
    let theta = 67.5 * Math.PI / 180;
    let phi = 45 * Math.PI / 180;
    let r = desiredHeight / Math.sin(theta);

    let points = [];
    for (let i = phi / 2; i < Math.PI * 2; i += phi) {
        points.push(new Point(r * Math.cos(i) + CW / 2, r * Math.sin(i) + CH / 2));
    }

    return points;
}

async function generate(i) {
    if (i > 7)
        return;
    let next = [];

    if (LINES.len() === 0) {
        initializeLines();
        generate(i+1);
        return;
    }

    LINES.get(i-1).map(function (line) {
        next.push(new KochLine(line.a(), line.b()));
        next.push(new KochLine(line.b(), line.c(i % 2)));
        next.push(new KochLine(line.c(i % 2), line.d()));
        next.push(new KochLine(line.d(), line.e()));
    });

    LINES.add(next);

    generate(i+1);
}

function loop(n = 0) {
    ctx.wipe();
    let sel = n % LINES.len();
    if (undefined != LINES.get(sel))
        ctx.line(LINES.get(sel));

    setTimeout(function() {
        loop(n+1);
    }, 1000);
}

generate(0);
loop();