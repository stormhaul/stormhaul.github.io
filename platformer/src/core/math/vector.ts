export class Vector
{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    /**
     * Adds passed vector to this one.
     *
     * @param v
     */
    add(v: Vector)
    {
        this._x += v.x;
        this._y += v.y;
    }

    /**
     * Multiplies this vector by c.
     *
     * @param c
     */
    mult(c: number)
    {
        this._x *= c;
        this._y *= c;
    }

    /**
     * Subtracts the passed vector from this one.
     *
     * @param v
     */
    sub(v: Vector)
    {
        this._x -= v.x;
        this._y -= v.y;
    }

    /**
     * Divides this vector by c.
     *
     * @param c
     */
    div(c: number)
    {
        if (c === 0) {
            throw new Error('Div by 0');
        }

        this._x /= c;
        this._y /= c;
    }

    /**
     * Returns the cartesian distance from this vector to the passed one.
     *
     * @param v
     */
    dist(v: Vector): number
    {
        return Math.sqrt(Math.pow(this._x - v.x,2) + Math.pow(this._y - v.y,2))
    }

    /**
     * Returns Magnitude of vector
     */
    mag(): number
    {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    /**
     * Converts this vector into a unit vector in the same direction.
     */
    unit()
    {
        this.div(this.mag());
    }

    normal(v: Vector): Vector
    {
        let norm = new Vector(
            -(v.y - this.y),
            v.x - this.x
        );
        norm.unit();

        return norm;
    }

    parallel(v: Vector): Vector
    {
        let par = new Vector(
            v.x - this.x,
            v.y - this.y
        );
        par.unit();

        return par;
    }

    clone(): Vector
    {
        return new Vector(this._x, this._y);
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