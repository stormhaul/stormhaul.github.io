"use strict";

function Grid(id) {
    this.id = id;
    this.cellWidth = 50;
    this.lineWidth = 1;
    this.lineColor = 'white';
    this.width = 20;
    this.height = 20;

    this.waypoints = [];
    this.wayKey = {};
    this.generateWaypoints();
    for (let i in this.waypoints) {
        let w = this.waypoints[i];
        this.wayKey['' + w.x + w.y] = true;
    }

    this.cellGrid = [];
    for (let i = 0; i < this.width; i++) {
        this.cellGrid.push([]);
        for (let j = 0; j < this.height; j++) {
            this.cellGrid[i].push(new Cell(new Point(i, j), this.wayKey[''+i+j] === true));
        }
    }
}

Grid.prototype.buildFullPath = function() {

};

Grid.prototype.findPath = function(start, end) {};

Grid.prototype.generateWaypoints = function(num) {
    let waypoints = [];

    while (waypoints.length < num) {
        let proposed = new Point(Math.floor(Math.random() * (this.width - 2) + 1), Math.floor(Math.random() * (this.height - 2) + 1));

        let conflict = false;
        for (let i in waypoints) {
            if (distance(proposed, waypoints[i]) < 3) {
                conflict = true;
                break;
            }
        }

        if (conflict) {
            continue;
        }

        waypoints.push(proposed);
    }

    this.waypoints = waypoints;
};

Grid.prototype.addTower = function() {};

Grid.prototype.convertGridToPixel = function(x, y, middle = false) {};

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
