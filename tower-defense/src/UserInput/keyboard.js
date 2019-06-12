"use strict";

function Keyboard() {
    let that = this;
    this.keys = {};

    document.addEventListener("keydown", function(e) {
        that.keys[e.code] = true;
    });

    document.addEventListener("keyup", function(e) {
        that.keys[e.code] = false;
    });
}

Keyboard.prototype.up = function() {
    return this.keys['ArrowUp'];
};
Keyboard.prototype.down = function() {
    return this.keys['ArrowDown'];
};
Keyboard.prototype.left = function() {
    return this.keys['ArrowLeft'];
};
Keyboard.prototype.right = function() {
    return this.keys['ArrowRight'];
};