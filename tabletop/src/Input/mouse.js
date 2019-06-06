"use strict";

function Mouse() {
    let that = this;
    this.clickConstants = {
        "left-click": 1,
        "middle-click": 2,
        "right-click": 3
    };

    document.addEventListener("mouseup", function(e) {
        switch(e.which) {
            case that.clickConstants["left-click"]:
                console.log("left click up");
                break;
            case that.clickConstants["middle-click"]:
                console.log("middle click up");
                break;
            case that.clickConstants["right-click"]:
                console.log("right click up");
                break;
            default:
                console.log("Unknown mouse button: " + e.which);
        }
    });
    document.addEventListener("mousedown", function(e) {
        switch(e.which) {
            case that.clickConstants["left-click"]:
                console.log("left click down");
                break;
            case that.clickConstants["middle-click"]:
                console.log("middle click down");
                break;
            case that.clickConstants["right-click"]:
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