import {Point} from "../helpers/point";
import {TextElement} from "../user-input/text.element";

export class Context {
    private ctx: CanvasRenderingContext2D;

    constructor (ctx: CanvasRenderingContext2D) {
        this.ctx  = ctx;
    }

    line(p1: Point, p2: Point, lineWidth: number, strokeStyle: string) {
        this.ctx.beginPath();

        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth;

        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);

        this.ctx.stroke();
    }

    circle(center: Point, radius: number, lineWidth: number, fill: boolean, fillStyle: string, stroke: boolean, strokeStyle: string) {
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

    rect(offset: Point, width: number, height: number, borderWidth: number, fill: boolean, fillStyle: string, stroke: boolean, strokeStyle: string) {
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

    text(text: TextElement, offset: Point = new Point(0,0)) {
        this.ctx.beginPath();

        this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
        this.ctx.fillStyle = text.getColor();

        let pos = text.getPosition().add(offset);
        if (null !== text.getMaxWidth()) {
            this.ctx.fillText(text.getValue(), pos.x, pos.y, text.getMaxWidth());
        } else {
            this.ctx.fillText(text.getValue(), pos.x, pos.y);
        }
    }

    measureText(text: TextElement): TextMetrics {
        this.ctx.font = text.getFontSize() + 'px ' + text.getFontFamily();
        return this.ctx.measureText(text.getValue());
    }
}