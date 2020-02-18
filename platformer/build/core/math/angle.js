define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Angle {
        constructor(degrees, overrideRadians = false) {
            this.comparisonAllowance = 0.0001;
            if (overrideRadians) {
                this._radians = degrees;
                this.updateDegrees();
            }
            else {
                this._degrees = degrees;
                this.updateRadians();
            }
        }
        get degrees() {
            return this._degrees;
        }
        get radians() {
            return this._radians;
        }
        equals(a) {
            let first = this.clone().reduced();
            let second = a.clone().reduced();
            return Math.abs(first.degrees - second.degrees) < this.comparisonAllowance;
        }
        add(a) {
            this._degrees += a.degrees;
            this.updateRadians();
        }
        reduced() {
            this._degrees += Math.floor(this._degrees / 360) * (-360);
            this.updateRadians();
            return this;
        }
        clone() {
            return new Angle(this._degrees);
        }
        updateDegrees() {
            this._degrees = this._radians * 180 / Math.PI;
        }
        updateRadians() {
            this._radians = this._degrees * Math.PI / 180;
        }
    }
    exports.Angle = Angle;
});
//# sourceMappingURL=angle.js.map