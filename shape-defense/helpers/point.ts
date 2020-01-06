export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y);
    }

    sub(p: Point): Point {
        return new Point(this.x - p.x, this.y - p.y);
    }

    mult(c: number): Point {
        return new Point(c * this.x, c * this.y);
    }

    is(p: Point): boolean {
        return this.x === p.x && this.y === p.y;
    }
}