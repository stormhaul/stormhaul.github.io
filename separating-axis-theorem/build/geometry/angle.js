define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Angle {
        constructor(degrees) {
            this._degrees = degrees;
            this._radians = degrees * Math.PI / 180;
        }
        add(angle) {
            this._degrees += angle.degrees;
            this._radians += angle.radians;
        }
        clone() {
            return new Angle(this._degrees);
        }
        get degrees() {
            return this._degrees;
        }
        get radians() {
            return this._radians;
        }
    }
    exports.Angle = Angle;
});
