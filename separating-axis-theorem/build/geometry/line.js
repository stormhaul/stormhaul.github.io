define(["require", "exports", "./point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Line {
        constructor(start, end) {
            this._start = start;
            this._end = end;
            this._length = start.dist(end);
            this._midpoint = this._start.along(this._end, this._length / 2);
        }
        getNormal() {
            let norm = this._end.clone();
            norm.sub(this._start);
            norm = new point_1.Point(norm.y, -norm.x);
            norm.unit();
            norm.mult(10);
            let start = this._midpoint.clone();
            let end = start.clone();
            end.add(norm);
            return new Line(start, end);
        }
        overlaps(l) {
            let a = this._start.x, b = this._start.y, c = this._end.x, d = this._end.y, p = l.start.x, q = l.start.y, r = l.end.x, s = l.end.y;
            let determinate = (c - a) * (s - q) - (r - p) * (d - b);
            if (determinate === 0) {
                return false;
            }
            else {
                let lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinate;
                let gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinate;
                return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            }
        }
        get start() {
            return this._start;
        }
        get end() {
            return this._end;
        }
    }
    exports.Line = Line;
});
