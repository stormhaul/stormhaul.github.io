define(["require", "exports", "../helpers/point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RenderableParent {
        attachParent(parent) {
            this.parent = parent;
            return this;
        }
        getParentOffset() {
            return this.parent !== null && this.parent !== undefined ? this.parent.getParentOffset() : new point_1.Point(0, 0);
        }
    }
    exports.RenderableParent = RenderableParent;
});
