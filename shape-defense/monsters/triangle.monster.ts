import {Monster} from "./monster";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";

export class TriangleMonster extends Monster {
    constructor(position: Point, path: Array<Point>) {
        super(position, path, 20, 100, 1, 40);
    }

    render(context: Context, offset: Point): void {
        super.render(context, offset);
        /**
         * @todo draw triangle using Monster direction and position.
         */
    }
}