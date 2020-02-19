define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Projection {
        constructor(line) {
            this._isIntersecting = false;
            this._line = line;
            this._unitVector = line.end.clone().sub(line.start).unit();
        }
        set isIntersecting(value) {
            this._isIntersecting = value;
        }
        overlaps(p) {
            let parallel = this._unitVector.dot(p.unitVector);
            let minX = Math.min(p.line.start.x, p.line.end.x);
            let maxX = Math.max(p.line.start.x, p.line.end.x);
            let verticalLine = this.line.start.x === this.line.end.x;
            let intersects;
            if (!verticalLine) {
                intersects = (this.line.start.x <= maxX && this.line.start.x >= minX) || (this.line.end.x <= maxX && this.line.end.x >= minX);
            }
            else {
                let minY = Math.min(p.line.start.y, p.line.end.y);
                let maxY = Math.max(p.line.start.y, p.line.end.y);
                intersects = (this.line.start.y <= maxY && this.line.start.y >= minY) || (this.line.end.y <= maxY && this.line.end.y >= minY);
            }
            return parallel && intersects;
        }
        get line() {
            return this._line;
        }
        get isIntersecting() {
            return this._isIntersecting;
        }
        get color() {
            return this._isIntersecting ? 'rgba(255, 0, 0, .5)' : 'rgba(0, 0, 255, .5)';
        }
        get unitVector() {
            return this._unitVector;
        }
    }
    exports.Projection = Projection;
});
