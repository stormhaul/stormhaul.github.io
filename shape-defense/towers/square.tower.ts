import {Tower} from './tower';
import {Context} from '../rendering/context';
import {Point} from '../helpers/point';

export class SquareTower extends Tower
{
    private sideLength: number;

    constructor(sideLength: number, position: Point)
    {
        super();

        this.sideLength = sideLength;
        this.position   = position;
    }

    render(context: Context, offset: Point): void
    {
        // @todo the offset add via sideLength/2 + 2 is in response to the towers being rendered halfway down the cell.
        // This should be fixed in the long term by figuring out the cell render dimensions and using the
        // difference between that and our tower dimensions to shift dynamically to the center.
        context.rect(
            this.position.add(this.getParentOffset()).add(offset === undefined ? new Point(0, 0) : offset).add(new Point(0, this.sideLength/2 + 4)),
            this.sideLength,
            this.sideLength,
            1,
            true,
            'purple',
            true,
            'red'
        );
    }
}