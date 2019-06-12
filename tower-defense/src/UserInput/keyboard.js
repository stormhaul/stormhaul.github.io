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
