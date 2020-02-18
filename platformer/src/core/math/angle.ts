export class Angle
{
    private _degrees: number;
    private _radians: number;
    private comparisonAllowance: number = 0.0001;

    get degrees(): number
    {
        return this._degrees;
    }

    get radians(): number
    {
        return this._radians;
    }

    constructor(degrees: number, overrideRadians: boolean = false)
    {
        if (overrideRadians) {
            this._radians = degrees;
            this.updateDegrees()
        } else {
            this._degrees = degrees;
            this.updateRadians()
        }
    }

    equals(a: Angle): boolean
    {
        let first = this.clone().reduced();
        let second = a.clone().reduced();

        return Math.abs(first.degrees - second.degrees) < this.comparisonAllowance;
    }

    add(a: Angle): void
    {
        this._degrees += a.degrees;
        this.updateRadians();
    }

    reduced(): Angle
    {
        this._degrees += Math.floor(this._degrees / 360) * (-360);
        this.updateRadians();

        return this;
    }

    clone(): Angle
    {
        return new Angle(this._degrees);
    }

    private updateDegrees(): void
    {
        this._degrees = this._radians * 180 / Math.PI;
    }

    private updateRadians(): void
    {
        this._radians = this._degrees * Math.PI / 180;
    }
}