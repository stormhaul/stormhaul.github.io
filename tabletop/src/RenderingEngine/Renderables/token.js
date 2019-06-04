"use strict";

function Token(position, image, owner, attachedObject) {
    this.position = position;
    this.image = image;
    this.owner = owner;
    this.attachedObject = attachedObject;

    this.render = function (perspective) {
        let ctx = perspective.ctx;
        let position = perspective.calculateRelativePosition(this.position);

        ctx.drawImage(position.x, position.y, this.image);
    }
}