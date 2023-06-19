define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Point = void 0;
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(p) {
            return new Point(this.x + p.x, this.y + p.y);
        }
        sub(p) {
            return new Point(this.x - p.x, this.y - p.y);
        }
        mult(c) {
            return new Point(c * this.x, c * this.y);
        }
        is(p) {
            return this.x === p.x && this.y === p.y;
        }
        dist(p) {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        }
        rotateAround(p, a) {
            let x = Math.cos(a.rad()) * (this.x - p.x) - Math.sin(a.rad()) * (this.y - p.y) + p.x;
            let y = Math.sin(a.rad()) * (this.x - p.x) + Math.cos(a.rad()) * (this.y - p.y) + p.y;
            return new Point(x, y);
        }
        toward(p, d) {
            return this.add(p.sub(this).unit().mult(d));
        }
        mag() {
            return this.dist(new Point(0, 0));
        }
        unit() {
            let mag = this.mag();
            return new Point(this.x / mag, this.y / mag);
        }
    }
    exports.Point = Point;
});
