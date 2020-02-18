define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector {
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }
        /**
         * Adds passed vector to this one.
         *
         * @param v
         */
        add(v) {
            this._x += v.x;
            this._y += v.y;
        }
        /**
         * Multiplies this vector by c.
         *
         * @param c
         */
        mult(c) {
            this._x *= c;
            this._y *= c;
        }
        /**
         * Subtracts the passed vector from this one.
         *
         * @param v
         */
        sub(v) {
            this._x -= v.x;
            this._y -= v.y;
        }
        /**
         * Divides this vector by c.
         *
         * @param c
         */
        div(c) {
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
        dist(v) {
            return Math.sqrt(Math.pow(this._x - v.x, 2) + Math.pow(this._y - v.y, 2));
        }
        /**
         * Returns Magnitude of vector
         */
        mag() {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }
        /**
         * Converts this vector into a unit vector in the same direction.
         */
        unit() {
            this.div(this.mag());
        }
        normal(v) {
            let norm = new Vector(-(v.y - this.y), v.x - this.x);
            norm.unit();
            return norm;
        }
        parallel(v) {
            let par = new Vector(v.x - this.x, v.y - this.y);
            par.unit();
            return par;
        }
        clone() {
            return new Vector(this._x, this._y);
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
    }
    exports.Vector = Vector;
});
//# sourceMappingURL=vector.js.map