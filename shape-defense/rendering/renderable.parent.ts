import {RenderableInterface} from "./renderable.interface";
import {Point} from "../helpers/point";
import {Context} from "./context";

export abstract class RenderableParent implements RenderableInterface{
    protected parent: RenderableInterface|null;
    protected position: Point;

    attachParent(parent: RenderableInterface): this {
        this.parent = parent;

        return this;
    }

    getParentOffset(): Point {
        return this.parent !== null && this.parent !== undefined ? this.parent.getParentOffset() : new Point(0,0);
    }

    abstract render(context: Context, offset: Point): void;
}