import {RenderableInterface} from "../rendering/renderable.interface";
import {Context} from "../rendering/context";
import {Point} from "../helpers/point";

export class TextElement implements RenderableInterface{
    private color: string;
    private fontFamily: string;
    private fontSize: number; // in pixels
    private position: Point;
    private value: string;
    private maxWidth: number;

    constructor() {
        // Defaults
        this.color          = "black";
        this.fontFamily     = "sans-serif";
        this.fontSize       = 12;
        this.position       = new Point(0,0);
        this.maxWidth       = -1;
    }


    getColor(): string {
        return this.color;
    }

    setColor(color: string): this {
        this.color = color;
        return this;
    }

    getFontFamily(): string {
        return this.fontFamily;
    }

    setFontFamily(fontFamily: string): this {
        this.fontFamily = fontFamily;
        return this;
    }

    getFontSize(): number {
        return this.fontSize;
    }

    setFontSize(fontSize: number): this {
        this.fontSize = fontSize;
        return this;
    }

    getPosition(): Point {
        return this.position;
    }

    setPosition(position: Point): this {
        this.position = position;
        return this;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): this {
        this.value = value;
        return this;
    }

    getTextMetrics(context: Context): TextMetrics {
        return context.measureText(this);
    }

    getMaxWidth(): number|null {
        return this.maxWidth === -1 ? null : this.maxWidth;
    }

    render(context: Context, offset: Point = new Point(0,0)): void {
        context.text(this, offset);
    }
}