define(["require", "exports", "./shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CircleShape extends shape_1.Shape {
        constructor(position, radius) {
            super(position);
            this._radius = radius;
        }
        get radius() {
            return this._radius;
        }
    }
    exports.CircleShape = CircleShape;
});
//# sourceMappingURL=circle.shape.js.map