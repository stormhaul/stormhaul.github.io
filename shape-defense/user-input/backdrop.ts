import {RenderableParent} from "../rendering/renderable.parent";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";

export class Backdrop extends RenderableParent{
    // Required Inputs
    private width: number;
    private height: number;
    private backgroundColor: string;

    // Optional Inputs
    private padding:number;
    private margin:number;
    private borderWidth: number;
    private borderColor: string;

    constructor(position: Point, width: number, height: number, backgroundColor: string) {
        super();

        this.position = position;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;

        // Defaults
        this.padding = 10;
        this.margin = 10;
        this.borderWidth = 1;
        this.borderColor = '#eee';
    }

    setPadding(padding: number): this {
        this.padding = padding;

        return this;
    }

    setMargin(margin: number): this {
        this.margin = margin;

        return this;
    }

    setBorderWidth(borderWidth: number): this {
        this.borderWidth = borderWidth;

        return this;
    }

    setBorderColor(borderColor: string): this {
        this.borderColor = borderColor;

        return this;
    }

    getParentOffset(): Point {
        let additionalOffset = this.padding + this.margin + 3 * this.borderWidth;
        return this.position.add(super.getParentOffset().add(new Point(additionalOffset, additionalOffset)));
    }

    render(context: Context, offset: Point = new Point(0,0)): void {
        let additionalOffset = this.padding + this.margin;

        //Outside Rectangle
        context.rect(
            this.position.add(new Point(additionalOffset, additionalOffset)),
            this.width,
            this.height,
            this.borderWidth,
            true,
            this.backgroundColor,
            true,
            this.borderColor
        );


        additionalOffset += 2 * this.borderWidth;

        //Inside Rectangle
        context.rect(
            this.position.add(new Point(additionalOffset, additionalOffset)),
            this.width - 4 * this.borderWidth,
            this.height - 4 * this.borderWidth,
            this.borderWidth,
            true,
            this.backgroundColor,
            true,
            this.borderColor
        );
    }
}