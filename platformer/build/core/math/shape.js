define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shape {
        constructor(position) {
            this._position = position;
        }
        get position() {
            return this._position;
        }
    }
    exports.Shape = Shape;
});
//# sourceMappingURL=shape.js.map