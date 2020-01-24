import {Angle} from './angle';

export class Point
{
    public x: number;
    public y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    add(p: Point): Point
    {
        return new Point(this.x + p.x, this.y + p.y);
    }

    sub(p: Point): Point
    {
        return new Point(this.x - p.x, this.y - p.y);
    }

    mult(c: number): Point
    {
        return new Point(c * this.x, c * this.y);
    }

    is(p: Point): boolean
    {
        return this.x === p.x && this.y === p.y;
    }

    dist(p: Point): number
    {
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    }

    rotateAround(p: Point, a: Angle): Point
    {
        let x = Math.cos(a.rad()) * (this.x - p.x) - Math.sin(a.rad()) * (this.y - p.y) + p.x;
        let y = Math.sin(a.rad()) * (this.x - p.x) + Math.cos(a.rad()) * (this.y - p.y) + p.y;
        return new Point(x, y);
    }
}