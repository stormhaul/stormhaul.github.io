import {ObjectParent} from './object.parent';
import {Point} from '../geometry/point';
import {Polygon} from '../geometry/polygon';
import {Context} from '../rendering/context';

export class Player extends ObjectParent
{
    private _position: Point;
    private _polygons: Polygon[];
    private _velocity: Point;
    private _acceleration: Point;

    constructor(position: Point)
    {
        super();
        this._position = position;
        this._velocity = new Point(0, 0);
        this._acceleration = new Point(0, 0);
        this._generatePolygons();
    }

    render(context: Context)
    {
        context.drawPolygons(this._polygons);
    }

    private _generatePolygons()
    {
        let sl = 10;
        let head = new Polygon(this._position.clone(), 3, sl);
        let leg1 = new Polygon(this._position.clone().add(new Point(-sl * 2, 0)), 4, sl);
        let leg2 = new Polygon(this._position.clone().add(new Point(sl * 2, 0)), 4, sl);
        let leg3 = new Polygon(this._position.clone().add(new Point(0, -sl * 2)), 4, sl);
        let leg4 = new Polygon(this._position.clone().add(new Point(0, sl * 2)), 4, sl);

        this._polygons = [
            head,
            leg1,
            leg2,
            leg3,
            leg4
        ];
    }

    get position(): Point
    {
        return this._position;
    }

    set position(value: Point)
    {
        this._position = value;
    }

    get polygons(): Polygon[]
    {
        return this._polygons;
    }

    get velocity(): Point
    {
        return this._velocity;
    }

    set velocity(value: Point)
    {
        this._velocity = value;
    }

    get acceleration(): Point
    {
        return this._acceleration;
    }

    set acceleration(value: Point)
    {
        this._acceleration = value;
    }
}