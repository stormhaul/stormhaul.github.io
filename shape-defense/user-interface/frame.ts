import {RenderableParent} from "../rendering/renderable.parent";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";

export class Frame extends RenderableParent{
    private width: number;
    private height: number;
    private borderWidth: number;
    private borderColor: string;

    constructor(
        position: Point,
        width: number,
        height: number,
        color: string = null
    ) {
        super();

        this.position = position;
        this.width = width;
        this.height = height;

        // Defaults
        this.borderWidth = 3;
        this.borderColor = color !== null ? color : '#333';
    }

    log() {
        console.log(this.position, this.getParentOffset(), this.position.add(this.getParentOffset()));
    }

    render(context: Context, offset: Point = new Point(0,0)): void {
        context.rect(
            this.position.add(this.getParentOffset()),
            this.width,
            this.height,
            this.borderWidth,
            false,
            '',
            true,
            this.borderColor
        );
    }
}