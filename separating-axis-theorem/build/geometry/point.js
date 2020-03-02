define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Point {
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }
        add(p) {
            this._x += p.x;
            this._y += p.y;
            return this;
        }
        sub(p) {
            this._x -= p.x;
            this._y -= p.y;
            return this;
        }
        mult(c) {
            this._x *= c;
            this._y *= c;
            return this;
        }
        mag() {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }
        unit() {
            let mag = this.mag();
            this._x /= mag;
            this._y /= mag;
            return this;
        }
        dist(p) {
            return Math.sqrt(Math.pow(this._x - p.x, 2) +
                Math.pow(this._y - p.y, 2));
        }
        along(p, l) {
            let along = p.clone();
            along.sub(this);
            along.unit();
            along.mult(l);
            along.add(this);
            return along;
        }
        dot(p) {
            return this._x * p.x + this._y * p.y;
        }
        projectedOnto(l) {
            let e1 = l.end.clone().sub(l.start);
            let e2 = this.clone().sub(l.start);
            let cosTheta = e1.dot(e2) / (e1.mag() * e2.mag());
            let len = e2.mag() * cosTheta;
            return l.start.along(l.end, len);
        }
        clone() {
            return new Point(this._x, this._y);
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
    }
    exports.Point = Point;
});
