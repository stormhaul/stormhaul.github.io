import {Monster} from "./monster";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";
import {SpeedArmor} from "./armor/speed.armor";

export class TriangleMonster extends Monster {
    constructor(position: Point, path: Array<Point>) {
        super(position, path, 20, 100, 1, 40, new SpeedArmor());
    }

    render(context: Context, offset: Point): void {
        super.render(context, offset);
        /**
         * @todo draw triangle using Monster direction and position.
         */
    }
}