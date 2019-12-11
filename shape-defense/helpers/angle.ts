export class Angle {
    private degrees: number;
    private radians: number;

    constructor(degrees: number) {
        this.degrees = degrees;
        this.radians = this.degrees * Math.PI / 180;
    }

    isEqualTo(angle: Angle): boolean {
        return this.deg() === angle.deg();
    }

    deg(): number {
        return this.degrees;
    }

    rad(): number {
        return this.radians;
    }

    add(angle: Angle): Angle {
        return new Angle(angle.deg() + this.deg());
    }

    sub(angle: Angle): Angle {
        return new Angle(this.deg() - angle.deg());
    }

    cos(): number {
        return Math.cos(this.radians);
    }

    sin(): number {
        return Math.sin(this.radians);
    }

    tan(): number {
        return Math.tan(this.radians);
    }
}