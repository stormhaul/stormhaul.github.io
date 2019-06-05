"use strict";

function Perspective(renderer, centerPoint, angle, height) {
    this.cw = renderer.canvasWidth;
    this.ch = renderer.canvasHeight;
    this.ctx = renderer.ctx;
    this.position = centerPoint;
    this.ha = angle;
    this.va = this.ha * this.ch / this.cw;
    this.height = height;
    this.currentHeight = height;

    this.moveVelocity = 10;

    this.viewPort = this.buildViewPort();
    this.createControlEvents();
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

Perspective.prototype.createControlEvents = function() {
    let that = this;
    document.addEventListener("keydown", function(event) {
        switch(event.code) {
            case 'KeyA':
            case 'ArrowLeft':
                that.position.x -= that.moveVelocity;
                break;
            case 'KeyW':
            case 'ArrowUp':
                that.position.y -= that.moveVelocity;
                break;
            case 'KeyD':
            case 'ArrowRight':
                that.position.x += that.moveVelocity;
                break;
            case 'KeyS':
            case 'ArrowDown':
                that.position.y += that.moveVelocity;
                break;
        }

        document.dispatchEvent(new Event('rerender'));
    });

    document.addEventListener("wheel", function(event) {
        console.log("Invert: ", Math.max(.01, that.currentHeight / that.height), "Scale: ", Math.max(.01, that.height / that.currentHeight));
        that.ctx.scale(Math.max(.01, that.currentHeight / that.height), Math.max(.01, that.currentHeight / that.height));
        that.currentHeight += event.deltaY;
        that.ctx.scale(Math.max(.01, that.height / that.currentHeight), Math.max(.01, that.height / that.currentHeight));
        let e = new Event('scaleChanged');
        e.scale = Math.max(.01, that.height / that.currentHeight);
        console.log(that.currentHeight, e);
        document.dispatchEvent(e);
        document.dispatchEvent(new Event('rerender'));
    });
};