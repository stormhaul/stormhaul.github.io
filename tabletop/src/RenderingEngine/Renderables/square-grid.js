"use strict";

function SquareGrid(width, height, radius) {
    this.w = width;
    this.h = height;
    this.cell = radius * 2;

    /**
     * @param perspective Perspective
     */
    this.render = function(perspective) {
        for (let i = 0; i <= Math.ceil(this.w / this.cell); i++) {
            let start = perspective.calculateRelativePosition({x: i * this.cell, y: 0});
            let end   = perspective.calculateRelativePosition({x: i * this.cell, y: this.h});

            this.drawGridLine(perspective.ctx, start, end);
        }

        for (let i = 0; i <= Math.ceil(this.h / this.cell); i++) {
            let start = perspective.calculateRelativePosition({x: 0, y: i * this.cell});
            let end   = perspective.calculateRelativePosition({x: this.w, y: i * this.cell});

            this.drawGridLine(perspective.ctx, start, end);
        }
    };

    this.drawGridLine = function(ctx, start, end, style = 'white') {
        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    };
}
