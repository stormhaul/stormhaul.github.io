define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Angle = void 0;
    class Angle {
        constructor(degrees) {
            this.degrees = degrees;
            this.radians = this.degrees * Math.PI / 180;
        }
        isEqualTo(angle) {
            return this.deg() === angle.deg();
        }
        deg() {
            return this.degrees;
        }
        rad() {
            return this.radians;
        }
        add(angle) {
            return new Angle(angle.deg() + this.deg());
        }
        sub(angle) {
            return new Angle(this.deg() - angle.deg());
        }
        cos() {
            return Math.cos(this.radians);
        }
        sin() {
            return Math.sin(this.radians);
        }
        tan() {
            return Math.tan(this.radians);
        }
    }
    exports.Angle = Angle;
});
