define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpaceConversion = void 0;
    class SpaceConversion {
        constructor(g1, g2) {
            this.g1 = g1;
            this.g2 = g2;
            this.ratio = g2.getGranularity() / g1.getGranularity();
        }
        convert(p) {
            return p.mult(this.ratio);
        }
    }
    exports.SpaceConversion = SpaceConversion;
});
