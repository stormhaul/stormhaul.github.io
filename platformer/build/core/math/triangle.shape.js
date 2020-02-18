define(["require", "exports", "./shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TriangleShape extends shape_1.Shape {
        get vertices() {
            return this._vertices;
        }
        constructor(position, vertices) {
            super(position);
            this._vertices = vertices;
        }
    }
    exports.TriangleShape = TriangleShape;
});
//# sourceMappingURL=triangle.shape.js.map