import {Context} from "./context";
import {Point} from "../helpers/point";

export interface RenderableInterface {
    attachParent(parent: RenderableInterface): this;
    getParentOffset(): Point;
    render(context: Context, offset: Point): void;
}