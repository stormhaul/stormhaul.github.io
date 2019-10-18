"use strict";
exports.__esModule = true;
var Layer = /** @class */ (function () {
    function Layer(priority) {
        this.rgstCounter = 0;
        this.renderables = {};
        if (priority === undefined) {
            priority = 0;
        }
        this.priority = priority;
    }
    Layer.prototype.addItem = function (renderable) {
        this.renderables[this.rgstCounter] = renderable;
        return this.rgstCounter++;
    };
    Layer.prototype.removeItem = function (id) {
        delete this.renderables[id];
    };
    Layer.prototype.render = function (context) {
        this.renderables.map(function (renderable) {
            renderable.render(context);
        });
    };
    Layer.prototype.getPriority = function () {
        return this.priority;
    };
    return Layer;
}());
exports.Layer = Layer;
