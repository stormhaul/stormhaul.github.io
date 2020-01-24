define(["require", "exports", "./tower", "../helpers/point"], function (require, exports, tower_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SquareTower extends tower_1.Tower {
        constructor(sideLength, position) {
            super();
            this.sideLength = sideLength;
            this.position = position;
        }
        render(context, offset) {
            context.rect(this.position.add(this.getParentOffset()).add(offset === undefined ? new point_1.Point(0, 0) : offset), this.sideLength, this.sideLength, 1, true, 'purple', true, 'red');
        }
    }
    exports.SquareTower = SquareTower;
});
