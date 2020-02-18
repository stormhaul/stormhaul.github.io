import {Vector} from './vector';

export abstract class Shape
{
    private _position: Vector;

    constructor(position: Vector)
    {
        this._position = position;
    }

    get position(): Vector
    {
        return this._position;
    }
}