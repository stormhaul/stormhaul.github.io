define(["require", "exports", "./tower"], function (require, exports, tower_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SquareTower extends tower_1.Tower {
        constructor(sideLength, position) {
            super();
            this.sideLength = sideLength;
            this.position = position;
        }
        render(context, offset) {
            context.rect(this.position.add(this.getParentOffset()), this.sideLength, this.sideLength, 1, true, 'purple', true, 'red');
        }
    }
    exports.SquareTower = SquareTower;
});
