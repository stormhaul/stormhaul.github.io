import {Shape} from './shape';
import {Vector} from './vector';

export class TriangleShape extends Shape
{
    private _vertices;

    get vertices()
    {
        return this._vertices;
    }

    constructor(position: Vector, vertices)
    {
        super(position);
        this._vertices = vertices;
    }
}