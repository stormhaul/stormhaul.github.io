define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ObjectParent {
        getMargin() {
            let max = 0;
            this.polygons.map(poly => {
                let dist = poly.distFurthestFrom(this.position);
                if (dist > max) {
                    max = dist;
                }
            });
            return max;
        }
        ;
    }
    exports.ObjectParent = ObjectParent;
});
