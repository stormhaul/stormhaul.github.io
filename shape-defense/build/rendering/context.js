define(["require", "exports", "../helpers/point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Context {
        constructor(ctx) {
            this.ctx = ctx;
        }
        clear() {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
        line(p1, p2, lineWidth, strokeStyle) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        }
        circle(center, radius, lineWidth, fill, fillStyle, stroke, strokeStyle) {
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
        }
        rect(offset, width, height, borderWidth, fill, fillStyle, stroke, strokeStyle) {
            this.ctx.beginPath();
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
        }
        text(text, offset = new point_1.Point(0, 0)) {
            this.ctx.beginPath();
            this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
            this.ctx.fillStyle = text.getColor();
            let pos = text.getPosition().add(offset);
            if (null !== text.getMaxWidth()) {
                this.ctx.fillText(text.getValue(), pos.x, pos.y, text.getMaxWidth());
            }
            else {
                this.ctx.fillText(text.getValue(), pos.x, pos.y);
            }
        }
        measureText(text) {
            this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
            return this.ctx.measureText(text.getValue());
        }
    }
    exports.Context = Context;
});
