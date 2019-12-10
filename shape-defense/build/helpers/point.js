define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    exports.Point = Point;
});
//# sourceMappingURL=point.js.map