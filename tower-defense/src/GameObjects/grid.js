"use strict";

function Grid(id) {
    this.id = id;
    this.cellWidth = 50;
    this.lineWidth = 1;
    this.lineColor = 'white';
    this.width = 20;
    this.height = 20;
}

Grid.prototype.findPath = function(start, end) {};
Grid.prototype.generateWaypoints = function() {};
Grid.prototype.addTower = function() {};
Grid.prototype.render = function(transformationMatrix, ctx) {
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.lineColor;
    let that = this;

    function getLinePixel(n) {
        return n * (that.cellWidth + that.lineWidth);
    }

    let gridWidth  = getLinePixel(this.width);
    let gridHeight = getLinePixel(this.height);

    for (let i = 0; i <= this.width; i++) {
        ctx.drawLine(
            new Point(
                transformationMatrix.x(getLinePixel(i)),
                transformationMatrix.y(0)
            ),
            new Point(
                transformationMatrix.x(getLinePixel(i)),
                transformationMatrix.y(gridHeight)
            )
        );
    }
    for (let i = 0; i <= this.height; i++) {
        ctx.drawLine(
            new Point(
                transformationMatrix.x(0),
                transformationMatrix.y(getLinePixel(i))
            ),
            new Point(
                transformationMatrix.x(gridWidth),
                transformationMatrix.y(getLinePixel(i))
            )
        );
    }
};
