import {Line} from './line';
import {Point} from './point';
import {Angle} from './angle';

export class RadialLine extends Line
{
    constructor(start: Point, angle: Angle, length: number)
    {
        let end = new Point(
            start.x + Math.cos(angle.radians) * length,
            start.y + Math.sin(angle.radians) * length
        );
        super(start, end);
    }
}