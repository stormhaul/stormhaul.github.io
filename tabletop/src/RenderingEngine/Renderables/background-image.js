"use strict";

function BackgroundImage(image) {
    this.element = image.element;
    this.width = image.width;
    this.height = image.height;
    this.pixelsPerUnit = image.pixelsPerUnit;

    /**
     * @param perspective Perspective
     */
    this.render = function(perspective) {
        let ctx = perspective.ctx;
        let position = perspective.calculateRelativePosition({x:0, y:0});

        ctx.drawImage(this.element, position.x, position.y);
    };
}
