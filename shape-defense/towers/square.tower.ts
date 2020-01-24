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
        context.rect(
            this.position.add(this.getParentOffset()).add(offset === undefined ? new Point(0, 0) : offset),
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