define(["require", "exports", "./resource.parent", "../../helpers/point"], function (require, exports, resource_parent_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gold = void 0;
    class Gold extends resource_parent_1.ResourceParent {
        constructor(position, startingGold = 0) {
            super(position);
            this.value = startingGold;
            this.valueMaximum = 99999;
            this.maximumDigits = 5;
        }
        renderIcon(context, offset) {
            context.circle(offset.add(new point_1.Point(this.iconSize / 2, this.iconSize / 2)), this.iconSize / 2, 1, true, '#ffd700', false, '');
        }
    }
    exports.Gold = Gold;
});
