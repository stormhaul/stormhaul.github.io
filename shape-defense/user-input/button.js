"use strict";
exports.__esModule = true;
var point_1 = require("../helpers/point");
var Button = /** @class */ (function () {
    function Button(position, width, height, label, event) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.label = label;
        this.event = event;
        // Defaults
        this.borderWidth = 1;
        this.backgroundColor = '#777';
        this.borderColor = '#eee';
        this.textColor = '#fff';
        this.hoverBackgroundColor = '#eee';
        this.hoverBorderColor = '#777';
        this.hoverTextColor = '#000';
        this.isHovered = false;
        this.alignment = 'center';
    }
    Button.prototype.trigger = function () {
        document.dispatchEvent(this.event);
    };
    Button.prototype.render = function (context) {
        context.rect(this.position, this.width, this.height, this.borderWidth, true, this.getBackgroundColor(), true, this.getBorderColor());
        this.setLabelAlignmentPostion(context);
        this.label.setColor(this.getTextColor());
        this.label.render(context);
    };
    Button.prototype.setLabelAlignmentPostion = function (context) {
        var metrics = context.measureText(this.label);
        var heightOffset = (this.height - (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent)) / 2;
        switch (this.alignment) {
            case 'left':
                this.label.setPosition(new point_1.Point(0, heightOffset));
                break;
            case 'center':
                this.label.setPosition(new point_1.Point((this.width - metrics.width) / 2, heightOffset));
                break;
            case 'right':
                this.label.setPosition(new point_1.Point(this.width - metrics.width, heightOffset));
                break;
            default:
                throw new Error('Invalid Alignment for label');
        }
    };
    Button.prototype.getBackgroundColor = function () {
        return this.isHovered ? this.hoverBackgroundColor : this.backgroundColor;
    };
    Button.prototype.getBorderColor = function () {
        return this.isHovered ? this.hoverBorderColor : this.borderColor;
    };
    Button.prototype.getTextColor = function () {
        return this.isHovered ? this.hoverTextColor : this.textColor;
    };
    Button.prototype.setHover = function (hovered) {
        this.isHovered = hovered;
    };
    /**
     * Point should be a relative point to whatever button is positioned on.
     * @param point
     */
    Button.prototype.isBounding = function (point) {
        return point.x >= this.position.x && point.x < (this.position.x + this.width) && point.y >= this.position.y && point.y <= (this.position.y + this.height);
    };
    return Button;
}());
exports.Button = Button;
