define(["require", "exports", "./resource.parent"], function (require, exports, resource_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Wave = void 0;
    class Wave extends resource_parent_1.ResourceParent {
        constructor(position, startingWave = 0) {
            super(position);
            this.value = startingWave;
            this.valueMaximum = 999;
            this.maximumDigits = 3;
        }
        renderIcon(context, offset) {
            context.heart(offset, 20, 20, 'blue');
        }
    }
    exports.Wave = Wave;
});
