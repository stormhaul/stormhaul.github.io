"use strict";

var vs = vs || {};

vs.context = () => {
    let canvas = document.getElementById(CANVAS_ID);
    let ctx = canvas.getContext('2d');

    ctx.w = canvas.width  = window.innerWidth;
    ctx.h = canvas.height = window.innerHeight;

    ctx.wipe = () => {
        ctx.clearRect(0, 0, ctx.w, ctx.h);
    };

    ctx.line = (points, color = DEFAULT_LINE_COLOR, width = DEFAULT_LINE_WIDTH, join = DEFAULT_LINE_JOIN) => {
        if (points.length < 2) {
            vs.invalidLineError();
        }

        ctx.lineWidth = width;
        ctx.lineJoin = join;
        ctx.strokeStyle = color;

        ctx.beginPath();

        let first = true;
        for (let i in points) {
            let point = points[i];
            if (first) {
                ctx.moveTo(point.x, point.y);
                continue;
            }

            ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();
    };

    ctx.circle = (center, radius, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
        ctx.fill();
    };

    ctx.dottedCircle = (center, radius, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.setLineDash([5, 2]);
        ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
        ctx.stroke();
    };

    ctx.text = (center, font, size, color, value, alignment) => {
        ctx.font = size + 'px ' + font;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(value, center.x, center.y + size/4);
    };

    return ctx;
};
