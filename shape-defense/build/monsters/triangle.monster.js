define(["require", "exports", "./monster"], function (require, exports, monster_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TriangleMonster extends monster_1.Monster {
        constructor(position, path) {
            super(position, path, 20, 100, 1, 40);
        }
    }
    exports.TriangleMonster = TriangleMonster;
});
