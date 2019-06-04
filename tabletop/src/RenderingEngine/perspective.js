"use strict";

function Perspective(renderer, centerPoint, angle, height) {
    this.cw = renderer.canvasWidth;
    this.ch = renderer.canvasHeight;
    this.ctx = renderer.ctx;
    this.position = centerPoint;
    this.ha = angle;
    this.va = this.ha * this.ch / this.cw;
    this.height = height;

    this.viewPort = this.buildViewPort();
}

Perspective.prototype.buildViewPort = function() {
    let hR = this.height / Math.cos(this.ha / 2);
    let vR = this.height / Math.cos(this.va / 2);

    let vW = 2 * hR * Math.sin(this.ha / 2);
    let vH = 2 * vR * Math.sin(this.va / 2);

    return {height: vH, width: vW};
};

Perspective.prototype.changeHeight = function(change) {
    this.height = Math.max(100, change + this.height);
    this.buildViewPort();
};

Perspective.prototype.changePosition = function(offsetPosition) {
    this.position.x += offsetPosition.x;
    this.position.y += offsetPosition.y;
};

Perspective.prototype.calculateRelativePosition = function(truePosition) {
    return {x: truePosition.x - this.position.x - (this.viewPort.width / 2), y: truePosition.y - this.position.y - (this.viewPort.height / 2)};
};
