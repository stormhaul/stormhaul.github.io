"use strict";

/**
 * @param background Background
 * @param grid
 * @constructor
 */
function Map(background, grid) {
    //layers are background, grid, then tokens
    this.background = background;
    this.grid = grid;
    this.tokens = [];
}

Map.prototype.addToken = function(token) {

};

Map.prototype.render = function(perspective) {
    console.log('hi', perspective);
    this.background.render(perspective);
    this.grid.render(perspective);
};