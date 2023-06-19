import {ResourceParent} from "./resource.parent";
import {Point} from "../../helpers/point";
import {Context} from "../../rendering/context";

export class Lives extends ResourceParent
{
    // Counts lives, catches escaped event to diminish lives and dispatches game over event when hitting 0.

    constructor(position: Point, startingLives: number = 20) {
        super(position);

        this.value = startingLives;
        this.valueMaximum = 99;
        this.maximumDigits = 2;
    }

    renderIcon(context: Context, offset: Point)
    {
        context.heart(offset, 20, 20, 'red');
    }
}