"use strict";

function Cell(gridIndices, waypoint) {
    this.contents = null;
    this.isWaypoint = waypoint;
    this.x = gridIndices.x;
    this.y = gridIndices.y;
}

Cell.prototype.empty = function () {
    this.contents = null;
};

Cell.prototype.isEmpty = function () {
    return this.contents === null;
};

Cell.prototype.addContent = function(content) {
    this.contents = content;
};
