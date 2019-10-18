import {Monster} from "./monster";
import {Point} from "../helpers/point";

export class TriangleMonster extends Monster {
    constructor(position: Point, path: Array<Point>) {
        super(position, path, 20, 100, 1, 40);
    }
}