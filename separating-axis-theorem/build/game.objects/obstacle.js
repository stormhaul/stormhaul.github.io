define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Obstacle {
        constructor(position, geometry, deadly = false, fixed = true) {
            this._position = position;
            this._polygons = geometry;
            this._deadly = deadly;
            this._fixed = fixed;
        }
        render(context) {
            context.drawPolygons(this._polygons);
        }
        get position() {
            return this._position;
        }
        get polygons() {
            return this._polygons;
        }
        get deadly() {
            return this._deadly;
        }
        get fixed() {
            return this._fixed;
        }
    }
    exports.Obstacle = Obstacle;
});
