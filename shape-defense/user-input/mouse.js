"use strict";
exports.__esModule = true;
var point_1 = require("../helpers/point");
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.clickSubscribers = [];
        this.moveSubscribers = [];
        document.addEventListener('mousemove', this.dispatchMove);
        document.addEventListener('click', this.dispatchClick);
        console.log("new mouse created");
    }
    Mouse.prototype.getMousePosition = function () {
        return this.mousePosition;
    };
    Mouse.prototype.getClickPosition = function () {
        return this.clickPosition;
    };
    Mouse.prototype.dispatchMove = function (e) {
        this.mousePosition = new point_1.Point(e.x, e.y);
        console.log(this);
        this.moveSubscribers.map(function (s) {
            s.execute();
        });
    };
    ;
    Mouse.prototype.dispatchClick = function (e) {
        this.clickPosition = new point_1.Point(e.x, e.y);
        this.clickSubscribers.map(function (s) {
            s.execute();
        });
    };
    ;
    Mouse.prototype.subscribe = function (event, sub) {
        switch (event) {
            case 'move':
                this.moveSubscribers.push(sub);
                break;
            case 'click':
                this.clickSubscribers.push(sub);
                break;
            default:
                throw new Error('Unknown Event Subscription');
        }
    };
    return Mouse;
}());
exports.Mouse = Mouse;
