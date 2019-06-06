"use strict";

const LEFTCLICK = "left-click";
const MIDDLECLICK = "middle-click";
const RIGHTCLICK = "right-click";

function Mouse() {
    let that = this;
    this.clickConstants = {};
    this.clickConstants[LEFTCLICK] = 1;
    this.clickConstants[MIDDLECLICK] = 2;
    this.clickConstants[RIGHTCLICK] = 3;

    document.addEventListener("mouseup", function(e) {
        switch(e.which) {
            case that.clickConstants[LEFTCLICK]:
                console.log(LEFTCLICK + " up");
                break;
            case that.clickConstants[MIDDLECLICK]:
                console.log(MIDDLECLICK + " up");
                break;
            case that.clickConstants[RIGHTCLICK]:
                console.log(RIGHTCLICK + " up");
                break;
            default:
                console.log("Unknown mouse button: " + e.which);
        }
    });
    document.addEventListener("mousedown", function(e) {
        switch(e.which) {
            case that.clickConstants[LEFTCLICK]:
                console.log(LEFTCLICK + " down");
                break;
            case that.clickConstants[MIDDLECLICK]:
                console.log(MIDDLECLICK + " down");
                break;
            case that.clickConstants[RIGHTCLICK]:
                console.log(RIGHTCLICK + " down");
                break;
            default:
                console.log("Unknown mouse button: " + e.which);
        }
    });
    document.addEventListener("dblclick", function(e) {
        console.log(e);
    });
    document.addEventListener("wheel", function(e) {
        console.log(e);
    });

    document.oncontextmenu = function() {
        return false;
    }
}