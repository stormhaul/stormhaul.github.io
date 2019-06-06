"use strict";

const LEFTCLICK = 1;
const MIDDLECLICK = 2;
const RIGHTCLICK = 3;

function Mouse() {
    let that = this;
    this.clickConstants = {};
    this.clickConstants[LEFTCLICK] = 1;
    this.clickConstants[MIDDLECLICK] = 2;
    this.clickConstants[RIGHTCLICK] = 3;

    document.addEventListener("mouseup", function(e) {
        switch(e.which) {
            case LEFTCLICK:
                console.log("left click up");
                break;
            case MIDDLECLICK:
                console.log("middle click up");
                break;
            case RIGHTCLICK:
                console.log("right click up");
                break;
            default:
                console.log("Unknown mouse button: " + e.which);
        }
    });
    document.addEventListener("mousedown", function(e) {
        switch(e.which) {
            case LEFTCLICK:
                console.log("left click down");
                break;
            case MIDDLECLICK:
                console.log("middle click down");
                break;
            case RIGHTCLICK:
                console.log("right click down");
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