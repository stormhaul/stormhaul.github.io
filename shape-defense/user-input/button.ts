import {Point} from "../helpers/point";
import {TextElement} from "./text.element";
import {RenderableInterface} from "../rendering/renderable.interface";
import {Context} from "../rendering/context";

export class Button implements RenderableInterface{
    private position: Point;
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
        context.rect(this.position, this.width, this.height, this.borderWidth, true, this.getBackgroundColor(), true, this.getBorderColor());
        this.setLabelAlignmentPostion(context);
        this.label.setColor(this.getTextColor());
        this.label.render(context, this.position);
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
        return point.x >= this.position.x && point.x < (this.position.x + this.width) && point.y >= this.position.y && point.y <= (this.position.y + this.height);
    }
}