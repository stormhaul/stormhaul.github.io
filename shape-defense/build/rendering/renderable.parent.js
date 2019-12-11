define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RenderableParent {
        attachParent(parent) {
            this.parent = parent;
            return this;
        }
        getParentOffset() {
            return this.parent !== null && this.parent !== undefined ? this.parent.getParentOffset().add(this.position) : this.position;
        }
    }
    exports.RenderableParent = RenderableParent;
});
