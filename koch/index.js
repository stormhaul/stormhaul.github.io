"use strict";

var CW = 1000;
var CH = CW * getAspectRatio();
var SH = 15;
var LINES = [];
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
        v = v.div(3);
        v = v.add(this.start);
        return v;
    };

    line.c = function() {
        let v = this.start.sub(this.end);
        v = v.div(3);
        v = v.rotate(-60);

        let b = this.b();

        return b.add(v);
    };

    line.d = function() {
        let v = this.start.sub(this.end);
        v = v.mult(2/3);
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
    LINES = [];

    let start = new Point(0, CH - SH);
    let end = new Point(CW, CH - SH);

    LINES.push(new KochLine(start, end));
}

function generate() {
    let next = [];

    LINES.map(function (line) {
        next.push(new KochLine(line.a(), line.b()));
        next.push(new KochLine(line.b(), line.c()));
        next.push(new KochLine(line.c(), line.d()));
        next.push(new KochLine(line.d(), line.e()));
    });

    LINES = next;
}

function loop(n = 0) {
    if (n % SETS === 0) {
        initializeLines();
    } else {
        generate();
    }

    ctx.wipe();
    ctx.line(LINES);

    setTimeout(function() {
        loop(n+1);
    }, 1000);
}

loop();