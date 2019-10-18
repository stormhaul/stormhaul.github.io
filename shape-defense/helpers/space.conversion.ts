import {Grid} from "./grid";
import {Point} from "./point";

export class SpaceConversion {
    private g1: Grid;
    private g2: Grid;
    private ratio: number;

    /**
     * @param g1 Source Grid
     * @param g2 Target Grid
     * @param ratio ratio of g1 units per g2 unit
     */
    constructor(g1: Grid, g2: Grid) {
        this.g1    = g1;
        this.g2    = g2;
        this.ratio = g2.getGranularity() / g1.getGranularity();
    }

    convert(p: Point) {
        return p.mult(this.ratio);
    }
}