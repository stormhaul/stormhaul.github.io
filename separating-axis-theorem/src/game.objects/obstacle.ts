import {Point} from '../geometry/point';
import {Polygon} from '../geometry/polygon';
import {Context} from '../rendering/context';

export class Obstacle
{
    private _position: Point;
    private _polygons: Polygon[];
    private _deadly: boolean;
    private _fixed: boolean;

    constructor(position: Point, geometry: Polygon[], deadly: boolean = false, fixed: boolean = true)
    {
        this._position = position;
        this._polygons = geometry;
        this._deadly   = deadly;
        this._fixed    = fixed;
    }

    render(context: Context)
    {
        context.drawPolygons(this._polygons);
    }

    get position(): Point
    {
        return this._position;
    }

    get polygons(): Polygon[]
    {
        return this._polygons;
    }

    get deadly(): boolean
    {
        return this._deadly;
    }

    get fixed(): boolean
    {
        return this._fixed;
    }
}