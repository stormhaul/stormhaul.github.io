"use strict";
exports.__esModule = true;
var point_1 = require("../helpers/point");
var TextElement = /** @class */ (function () {
    function TextElement() {
        // Defaults
        this.color = "black";
        this.fontFamily = "sans-serif";
        this.fontSize = 12;
        this.position = new point_1.Point(0, 0);
        this.maxWidth = -1;
    }
    TextElement.prototype.getColor = function () {
        return this.color;
    };
    TextElement.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    TextElement.prototype.getFontFamily = function () {
        return this.fontFamily;
    };
    TextElement.prototype.setFontFamily = function (fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    };
    TextElement.prototype.getFontSize = function () {
        return this.fontSize;
    };
    TextElement.prototype.setFontSize = function (fontSize) {
        this.fontSize = fontSize;
        return this;
    };
    TextElement.prototype.getPosition = function () {
        return this.position;
    };
    TextElement.prototype.setPosition = function (position) {
        this.position = position;
        return this;
    };
    TextElement.prototype.getValue = function () {
        return this.value;
    };
    TextElement.prototype.setValue = function (value) {
        this.value = value;
        return this;
    };
    TextElement.prototype.getTextMetrics = function (context) {
        return context.measureText(this);
    };
    TextElement.prototype.getMaxWidth = function () {
        return this.maxWidth === -1 ? null : this.maxWidth;
    };
    TextElement.prototype.render = function (context) {
        context.text(this);
    };
    return TextElement;
}());
exports.TextElement = TextElement;
