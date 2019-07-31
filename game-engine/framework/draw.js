"use strict";

var engine = engine || {};

engine.draw = () => {
    let d = {};

    d.canvas = document.getElementById('canvas');
    d.width  = d.canvas.width;
    d.height = d.canvas.height;
    d.ctx    = d.canvas.getContext('2d');

    // example of fill style with pattern
    //
    // var canvas = document.getElementById("myCanvas");
    // var context = canvas.getContext("2d");
    //
    // var imageObj = new Image();
    // imageObj.onload = function(){
    //     var pattern = context.createPattern(imageObj, "repeat");
    //
    //     context.beginPath(); // begin custom shape
    //     context.moveTo(170, 80);
    //     context.bezierCurveTo(130, 100, 130, 150, 230, 150);
    //     context.bezierCurveTo(250, 180, 320, 180, 340, 150);
    //     context.bezierCurveTo(420, 150, 420, 120, 390, 100);
    //     context.bezierCurveTo(430, 40, 370, 30, 340, 50);
    //     context.bezierCurveTo(320, 5, 250, 20, 250, 50);
    //     context.bezierCurveTo(200, 5, 150, 20, 170, 80);
    //     context.closePath(); // complete custom shape
    //
    //     context.fillStyle = pattern;
    //     context.fill();
    //
    // };
    // imageObj.src = "https://www.google.com/intl/en_com/images/srpr/logo3w.png";

    d.triangle = (vertices, fill = false) => {

        d.ctx.beginPath();
        d.ctx.lineJoin = 'bevel';

        vertices.map((vertex, index) => {
            if (index === 0) {
                d.ctx.moveTo(vertex.x, vertex.y);
            } else {
                d.ctx.lineTo(vertex.x, vertex.y);
            }
        });

        if (false === fill) {
            d.ctx.lineTo(vertices[0].x, vertices[0].y);

            d.ctx.strokeStyle = 'white';
            d.ctx.stroke();
            return;
        }

        d.ctx.fillStyle = fill;
        d.ctx.fill();
    };

    d.wipe = () => {
        d.ctx.clearRect(0, 0, d.width, d.height);
    };

    return d;
};