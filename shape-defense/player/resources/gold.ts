import {ResourceParent} from "./resource.parent";
import {Point} from "../../helpers/point";
import {Context} from "../../rendering/context";

export class Gold extends ResourceParent
{
    // Gold counter, accepts build request events, dispatches has gold or doesn't have gold events. Need to pair with a
    // uniqueish build id probably.

    // Add gold events on monster death

    constructor(position: Point, startingGold: number = 0) {
        super(position);

        this.value = startingGold;
        this.valueMaximum = 99999;
        this.maximumDigits = 5;
    }

    renderIcon(context: Context, offset: Point)
    {
        context.circle(
            offset.add(new Point(this.iconSize/2, this.iconSize/2)),
            this.iconSize/2,
            1,
            true,
            '#ffd700',
            false,
            ''
        );
    }
}