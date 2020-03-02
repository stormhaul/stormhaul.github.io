import {Line} from './line';

export class Point
{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    add(p: Point): Point
    {
        this._x += p.x;
        this._y += p.y;
        return this;
    }

    sub(p: Point): Point
    {
        this._x -= p.x;
        this._y -= p.y;
        return this;
    }

    mult(c: number): Point
    {
        this._x *= c;
        this._y *= c;
        return this;
    }

    mag(): number
    {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    unit(): Point
    {
        let mag = this.mag();
        this._x /= mag;
        this._y /= mag;
        return this;
    }

    dist(p: Point)
    {
        return Math.sqrt(
            Math.pow(this._x - p.x, 2) +
            Math.pow(this._y - p.y, 2)
        );
    }

    along(p: Point, l: number): Point
    {
        let along = p.clone();
        along.sub(this);
        along.unit();
        along.mult(l);
        along.add(this);

        return along;
    }

    dot(p: Point): number
    {
        return this._x * p.x + this._y * p.y;
    }

    projectedOnto(l: Line): Point
    {
        let e1 = l.end.clone().sub(l.start);
        let e2 = this.clone().sub(l.start);
        let cosTheta = e1.dot(e2) / (e1.mag() * e2.mag());
        let len = e2.mag() * cosTheta;
        return l.start.along(l.end, len);
    }

    clone(): Point
    {
        return new Point(this._x, this._y);
    }

    get x(): number
    {
        return this._x;
    }

    get y(): number
    {
        return this._y;
    }
}