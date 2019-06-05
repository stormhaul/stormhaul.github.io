"use strict";

function MapFactory() {

}

/**
 * @param image {HTMLElement, width, height, pixelsPerUnit};
 * @param gridType
 */
MapFactory.prototype.buildMap = function(image, gridType) {
    let background = this.buildBackgroundImage(image);
    let grid = this.buildGrid(gridType, image.width, image.height, image.pixelsPerUnit / 2);

    return new Map(background, grid);
};

MapFactory.prototype.buildBackgroundImage = function(image) {
    return new BackgroundImage(image);
};

MapFactory.prototype.buildGrid = function(type, width, height, radius){
    switch(type) {
        case 'square': return this.buildSquareGrid(width, height, radius);
        case 'hex':    return this.buildHexGrid(width, height, radius);
        default:       throw new Error('Invalid Grid Type: ' + type);
    }
};

MapFactory.prototype.buildSquareGrid = function(width, height, radius) {
    return new SquareGrid(width, height, radius);
};

MapFactory.prototype.buildHexGrid = function(width, height, radius) {
    return new HexGrid(width, height, radius);
};