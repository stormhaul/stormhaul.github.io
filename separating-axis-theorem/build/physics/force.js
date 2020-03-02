define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Force {
        constructor(vector) {
            this._vector = vector;
        }
        multiplied(c) {
            return new Force(this._vector.clone().mult(c));
        }
        get vector() {
            return this._vector;
        }
    }
    exports.Force = Force;
});
