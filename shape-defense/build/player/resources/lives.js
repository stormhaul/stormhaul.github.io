define(["require", "exports", "./resource.parent"], function (require, exports, resource_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lives = void 0;
    class Lives extends resource_parent_1.ResourceParent {
        constructor(position, startingLives = 20) {
            super(position);
            this.value = startingLives;
            this.valueMaximum = 99;
            this.maximumDigits = 2;
        }
        renderIcon(context, offset) {
            context.heart(offset, 20, 20, 'red');
        }
    }
    exports.Lives = Lives;
});
