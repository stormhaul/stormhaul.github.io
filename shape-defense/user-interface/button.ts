import {Point} from "../helpers/point";
import {TextElement} from "./text.element";
import {RenderableInterface} from "../rendering/renderable.interface";
import {Context} from "../rendering/context";
import {RenderableParent} from "../rendering/renderable.parent";

export class Button extends RenderableParent{
    protected position: Point;
    private width: number;
    private height: number;
    private borderWidth: number;
    private backgroundColor: string;
    private borderColor: string;
    private textColor: string;
    private label: TextElement;
    private hoverBackgroundColor: string;
    private hoverBorderColor: string;
    private hoverTextColor: string;
    private isHovered: boolean;
    private alignment: string;
    private event: Event;

    constructor(position: Point, width: number, height: number, label: TextElement, event: Event) {
        super();
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

    trigger(): void {
        document.dispatchEvent(this.event);
    }

    render(context: Context): void {
        context.rect(this.getParentOffset().add(this.position), this.width, this.height, this.borderWidth, true, this.getBackgroundColor(), true, this.getBorderColor());
        this.setLabelAlignmentPostion(context);
        this.label.setColor(this.getTextColor());
        this.label.render(context, this.position.add(this.getParentOffset()));
    }

    setLabelAlignmentPostion(context: Context): void {
        let metrics = context.measureText(this.label);
        let textHeight = metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent;
        // The additional + textHeight is to account for text filling starting at bottom left for some reason.
        let heightOffset = (this.height - textHeight) / 2 + textHeight;
        switch(this.alignment) {
            case 'left':
                this.label.setPosition(new Point(0, heightOffset));
                break;
            case 'center':
                this.label.setPosition(new Point((this.width - metrics.width) / 2, heightOffset));
                break;
            case 'right':
                this.label.setPosition(new Point(this.width - metrics.width, heightOffset));
                break;
            default:
                throw new Error('Invalid Alignment for label');
        }
    }

    getBackgroundColor(): string {
        return this.isHovered ? this.hoverBackgroundColor : this.backgroundColor;
    }

    setBackgroundColor(color: string): this {
        this.backgroundColor = color;

        return this;
    }

    setHoverBackgroundColor(color: string): this {
        this.hoverBackgroundColor = color;

        return this;
    }

    setBorderColor(color: string): this {
        this.borderColor = color;

        return this;
    }

    setHoverBorderColor(color: string): this {
        this.hoverBorderColor = color;

        return this;
    }

    getBorderColor(): string {
        return this.isHovered ? this.hoverBorderColor : this.borderColor;
    }

    getTextColor(): string {
        return this.isHovered ? this.hoverTextColor : this.textColor;
    }

    setHover(hovered: boolean): void {
        this.isHovered = hovered;
    }

    /**
     * Point should be a relative point to whatever button is positioned on.
     * @param point
     */
    isBounding(point: Point): boolean {
        let p = point.sub(this.getParentOffset());
        return p.x >= this.position.x && p.x < (this.position.x + this.width) && p.y >= this.position.y && p.y <= (this.position.y + this.height);
    }
}