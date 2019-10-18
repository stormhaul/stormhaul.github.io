"use strict";
exports.__esModule = true;
var Scene = /** @class */ (function () {
    function Scene(mouse) {
        this.panels = [];
        this.mouse = mouse;
    }
    Scene.prototype.addPanel = function (panel) {
        this.panels.push(panel);
        return this.panels.length - 1;
    };
    Scene.prototype.activate = function () {
        this.panels.map(function (panel) {
            panel.activate();
        });
    };
    Scene.prototype.deactivate = function () {
        this.panels.map(function (panel) {
            panel.deactivate();
        });
    };
    Scene.prototype.render = function (context) {
        this.panels.map(function (panel) {
            panel.render(context);
        });
    };
    return Scene;
}());
exports.Scene = Scene;
