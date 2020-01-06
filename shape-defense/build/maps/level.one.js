define(["require", "exports", "./game.map", "../helpers/grid", "./path", "../helpers/point", "../helpers/a.star"], function (require, exports, game_map_1, grid_1, path_1, point_1, a_star_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LevelOne extends game_map_1.GameMap {
        constructor() {
            super();
            this.grid = new grid_1.Grid(10, 10);
            this.grid
                .set(new point_1.Point(0, 1), 1)
                .set(new point_1.Point(1, 1), 1)
                .set(new point_1.Point(2, 1), 1);
            let path = new path_1.Path([
                new point_1.Point(0, 0),
                new point_1.Point(5, 0),
                new point_1.Point(0, 5),
                new point_1.Point(9, 9)
            ]);
            this.deltaTime();
            let cur = path.getRoot();
            while (cur != null) {
                let next = path.getNext(cur);
                if (next === null) {
                    cur = null;
                    continue;
                }
                console.log(a_star_1.AStar(this.grid, cur, next));
                cur = next;
            }
            console.log(this.deltaTime());
        }
        setup() {
            return this;
        }
        start() {
            this.deltaTime();
            return this;
        }
        stop() {
            return this;
        }
    }
    exports.LevelOne = LevelOne;
});
