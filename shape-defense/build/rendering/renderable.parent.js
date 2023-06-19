define(["require", "exports", "../helpers/point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RenderableParent = void 0;
    class RenderableParent {
        attachParent(parent) {
            this.parent = parent;
            return this;
        }
        getParentOffset() {
            return this.parent !== null && this.parent !== undefined ? this.parent.getParentOffset() : new point_1.Point(0, 0);
        }
        getPosition() {
            return this.position;
        }
    }
    exports.RenderableParent = RenderableParent;
});
