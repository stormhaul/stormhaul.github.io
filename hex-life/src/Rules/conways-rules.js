"use strict";

function ConwaysRules() {
    this.underpopulation = 1; //exclusive
    this.overpopulation = 2; //exclusive
    this.born = 2; //exact
}

/**
 * If returns -1, then kill
 * If returns 0, them maintain
 * If returns 1, then revive
 *
 * @param liveNeighbors {int}
 * @returns -1|0|1
 */
ConwaysRules.prototype.evaluate = function(liveNeighbors) {
    return liveNeighbors < this.underpopulation || liveNeighbors > this.overpopulation ? -1 : liveNeighbors === this.born ? 1 : 0;
};
