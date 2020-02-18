define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Random {
        /**
         * Generate int from start up to start + range - 1.
         */
        int(start, range) {
            return Math.floor(Math.random() * range) + start;
        }
    }
    exports.Random = Random;
});
//# sourceMappingURL=random.js.map