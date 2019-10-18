"use strict";
exports.__esModule = true;
var Context = /** @class */ (function () {
    function Context(ctx) {
        this.ctx = ctx;
    }
    Context.prototype.line = function (p1, p2, lineWidth, strokeStyle) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    };
    Context.prototype.circle = function (center, radius, lineWidth, fill, fillStyle, stroke, strokeStyle) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        if (fill) {
            this.ctx.fill();
        }
        if (stroke) {
            this.ctx.stroke();
        }
    };
    Context.prototype.rect = function (offset, width, height, borderWidth, fill, fillStyle, stroke, strokeStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = borderWidth;
        this.ctx.rect(offset.x, offset.y, width, height);
        if (fill) {
            this.ctx.fill();
        }
        if (stroke) {
            this.ctx.stroke();
        }
    };
    Context.prototype.text = function (text) {
        this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
        this.ctx.fillStyle = text.getColor();
        if (null !== text.getMaxWidth()) {
            this.ctx.fillText(text.getValue(), text.getPosition().x, text.getPosition().y, text.getMaxWidth());
        }
        else {
            this.ctx.fillText(text.getValue(), text.getPosition().x, text.getPosition().y);
        }
    };
    Context.prototype.measureText = function (text) {
        this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
        return this.ctx.measureText(text.getValue());
    };
    return Context;
}());
exports.Context = Context;
