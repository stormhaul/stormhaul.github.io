export class Angle
{
    private _degrees: number;
    private _radians: number;

    constructor(degrees: number)
    {
        this._degrees = degrees;
        this._radians = degrees * Math.PI / 180;
    }

    add(angle: Angle)
    {
        this._degrees += angle.degrees;
        this._radians += angle.radians;
    }

    clone(): Angle
    {
        return new Angle(this._degrees);
    }

    get degrees(): number
    {
        return this._degrees;
    }

    get radians(): number
    {
        return this._radians;
    }
}
