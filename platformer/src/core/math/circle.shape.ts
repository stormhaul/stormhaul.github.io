import {Shape} from './shape';
import {Vector} from './vector';

export class CircleShape extends Shape
{
    private _radius: number;

    constructor(position: Vector, radius: number)
    {
        super(position);
        this._radius = radius;
    }

    get radius(): number
    {
        return this._radius;
    }
}