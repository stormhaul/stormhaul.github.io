import {Point} from '../geometry/point';

export class Force
{
    private _vector: Point;

    constructor(vector: Point)
    {
        this._vector = vector;
    }

    multiplied(c: number): Force
    {
        return new Force(
            this._vector.clone().mult(c)
        );
    }

    get vector(): Point
    {
        return this._vector;
    }
}