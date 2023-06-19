import {ResourceParent} from "./resource.parent";
import {Context} from "../../rendering/context";
import {Point} from "../../helpers/point";

export class Wave extends ResourceParent
{
    // Wave counter for visual representation and records.

    constructor(position: Point, startingWave: number = 0) {
        super(position);

        this.value = startingWave;
        this.valueMaximum = 999;
        this.maximumDigits = 3;
    }

    renderIcon(context: Context, offset: Point)
    {
        // @todo Make wave function
        context.heart(offset, 20, 20, 'blue');
    }
}