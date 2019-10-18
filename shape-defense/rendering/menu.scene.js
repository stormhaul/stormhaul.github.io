"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var scene_1 = require("./scene");
var layer_1 = require("./viewport-panels/layer");
var viewport_panel_1 = require("./viewport-panels/viewport.panel");
var point_1 = require("../helpers/point");
var button_1 = require("../user-input/button");
var text_element_1 = require("../user-input/text.element");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene(mouse) {
        var _this = _super.call(this, mouse) || this;
        _this.backgroundLayer = new layer_1.Layer();
        _this.separatorLayer = new layer_1.Layer(1);
        _this.textLayer = new layer_1.Layer(2);
        _this.buttonLayer = new layer_1.Layer(3);
        _this.panel = new viewport_panel_1.ViewportPanel(_this.mouse, new point_1.Point(0, 0), window.innerWidth, window.innerHeight, _this.moveHandler, _this.clickHandler);
        _this.addPanel(_this.panel);
        _this.panel.addLayer(_this.backgroundLayer);
        _this.panel.addLayer(_this.separatorLayer);
        _this.panel.addLayer(_this.textLayer);
        _this.panel.addLayer(_this.buttonLayer);
        var startLabel = new text_element_1.TextElement().setValue('Start');
        var startButton = new button_1.Button(new point_1.Point(50, 50), 150, 40, startLabel, new Event('start.button.clicked'));
        var startId = _this.buttonLayer.addItem(startButton);
        _this.startButton = startButton;
        return _this;
    }
    MenuScene.prototype.moveHandler = function (position) {
        var relativePos = position.sub(this.panel.getOffset());
        if (this.startButton.isBounding(relativePos)) {
            this.startButton.setHover(true);
        }
        else {
            this.startButton.setHover(false);
        }
    };
    MenuScene.prototype.clickHandler = function (position) {
        var relativePos = position.sub(this.panel.getOffset());
        if (this.startButton.isBounding(relativePos)) {
            this.startButton.trigger();
        }
    };
    return MenuScene;
}(scene_1.Scene));
exports.MenuScene = MenuScene;
