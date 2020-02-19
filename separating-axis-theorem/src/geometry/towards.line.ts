import {Line} from './line';
import {Point} from './point';

export class TowardsLine extends Line
{
    constructor(start: Point, direction: Point, length: number)
    {
        let end = direction.clone();
        end.sub(start);
        end.unit();
        end.mult(length);
        end.add(start);

        super(start, end);
    }
}