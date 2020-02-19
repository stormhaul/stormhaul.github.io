define(["require", "exports", "./line", "./point"], function (require, exports, line_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RadialLine extends line_1.Line {
        constructor(start, angle, length) {
            let end = new point_1.Point(start.x + Math.cos(angle.radians) * length, start.y + Math.sin(angle.radians) * length);
            super(start, end);
        }
    }
    exports.RadialLine = RadialLine;
});
