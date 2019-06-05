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

        let scale = perspective.getScaleFactor();
        let inverted = 1 / perspective.getScaleFactor();
        ctx.scale(scale, scale);
        ctx.drawImage(this.element, position.x, position.y, this.width, this.height);
        ctx.scale(inverted, inverted);
    };
}
