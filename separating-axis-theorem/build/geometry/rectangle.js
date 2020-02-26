define(["require", "exports", "./polygon"], function (require, exports, polygon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rectangle extends polygon_1.Polygon {
        constructor(center, width, height) {
            super(center, 4, width);
        }
        generateVertices() {
            return [];
        }
        generateEdges() {
            return [];
        }
        generateNormals() {
            return [];
        }
    }
    exports.Rectangle = Rectangle;
});
