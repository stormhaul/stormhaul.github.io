"use strict";

function Grid(screenWidth, screenHeight, hexSideLength, rules) {
    this.exampleHex = new Hexagon(new Point(0,0), hexSideLength);

    let lineWidth = 1;
    let hexPairWidth = this.exampleHex.getNestedWidth();
    let hexPairHeight = this.exampleHex.getNestedHeight();

    this.gridWidth = Math.ceil(screenWidth / (hexPairWidth + 2 * lineWidth));
    this.gridHeight = Math.ceil(screenHeight / (hexPairHeight + 2 * lineWidth));
    this.rules = rules;

    this.cells = [];
    for (let i = 0; i < this.gridWidth * 2; i++) {
        this.cells.push([]);
        for (let j = 0; j < this.gridHeight * 2; j++) {
            let isEdge = i === 0 || i === this.gridWidth - 1 || j === 0 || j === this.gridHeight - 1;
            this.cells[i].push(new Cell(i, j, isEdge, new Hexagon(this.getPixelCenter(i,j), hexSideLength)));
        }
    }

    this.neighborCache = {};
}

Grid.prototype.getPixelCenter = function(x,y) {
    return new Point(
        (this.exampleHex.radius + this.exampleHex.sideLength) * x + this.exampleHex.radius,
        x % 2 === 0 ? this.exampleHex.apothem * (2 * y + 1)
                    : 2 * this.exampleHex.apothem * (y + 1)
    );
};

Grid.prototype.getNeighborhood = function(x, y) {
    // @todo these vectors assume flat top orientation... not sure how I want to fix

    if (this.neighborCache[''+x+y] !== undefined) {
        return this.neighborCache[''+x+y];
    }

    let vectors = [
        [ // even column vectors
            [-1,-1],
            [0,-1],
            [1,-1],
            [1,0],
            [0,1],
            [-1,0]
        ],
        [ // odd column vectors
            [-1,0],
            [0,-1],
            [1,0],
            [1,1],
            [0,1],
            [-1,1]
        ]
    ];

    let column = x % 2;
    let neighbors = [];
    for (let i in vectors[column]) {
        let vec = vectors[column][i];
        neighbors.push(this.cells[(x + vec[0] + this.gridWidth) % this.gridWidth][(y + vec[1] + this.gridHeight) % this.gridHeight]);
    }

    this.neighborCache[''+x+y] = new Neighborhood(neighbors);
    return this.neighborCache[''+x+y];
};

Grid.prototype.iterate = function(ctx) {
    let that = this;
    this.cells.map(function(row, x) {
        row.map(function (cell, y) {
            let neighbors = that.getNeighborhood(x, y);
            let action = that.rules.evaluate(neighbors.sum());

            switch (action) {
                case -1:
                    cell.kill();
                    break;
                case 1:
                    cell.revive();
                    break;
                default:
                    //do nothing
            }
        });
    });

	document.dispatchEvent(new Event('nextTurn'));
    this.renderFrame(ctx);
};

Grid.prototype.renderFrame = function(ctx) {
    ctx.wipe();
    this.cells.map(function(row) {
        row.map(function(cell){
            cell.render(ctx);
        });
    });
};
