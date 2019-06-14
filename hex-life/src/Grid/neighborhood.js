"use strict";

/**
 * @param neighbors {Array: {Cell}}
 * @constructor
 */
function Neighborhood(neighbors) {
    this.neighbors = neighbors;
}

/**
 * Adds previous of all neighbors in the hood.
 *
 * @returns {number}
 */
Neighborhood.prototype.sum = function() {
    let sum = 0;
    this.neighbors.map(function(a) {
        sum += a.previous ? 1 : 0;
    });
    return sum;
};
