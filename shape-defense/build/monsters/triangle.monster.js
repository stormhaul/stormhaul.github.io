define(["require", "exports", "./monster", "../helpers/point", "./armor/speed.armor"], function (require, exports, monster_1, point_1, speed_armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TriangleMonster = void 0;
    class TriangleMonster extends monster_1.Monster {
        constructor(position, path) {
            super(position, path, 10, 100, 1, 40, new speed_armor_1.SpeedArmor());
        }
        render(context, offset) {
            super.render(context, offset);
            context.triangle(this.position.add(offset).add(new point_1.Point(0, 50)), 20, this.getDirection(), 1, true, 'yellow', true, 'green');
        }
    }
    exports.TriangleMonster = TriangleMonster;
});
