"use strict";
exports.__esModule = true;
var context_1 = require("./rendering/context");
var menu_scene_1 = require("./rendering/menu.scene");
var mouse_1 = require("./user-input/mouse");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.setup = function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        var context = new context_1.Context(this.ctx);
        var mouse = new mouse_1.Mouse();
        var menuScene = new menu_scene_1.MenuScene(mouse);
    };
    Main.prototype.run = function () {
    };
    return Main;
}());
exports.Main = Main;
