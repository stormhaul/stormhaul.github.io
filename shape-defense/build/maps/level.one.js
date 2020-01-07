define(["require", "exports", "./game.map", "../helpers/grid", "./path", "../helpers/point", "../helpers/a.star", "../towers/square.tower"], function (require, exports, game_map_1, grid_1, path_1, point_1, a_star_1, square_tower_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LevelOne extends game_map_1.GameMap {
        constructor(width, height) {
            let cols = 10;
            let rows = 10;
            let cellWidth = Math.floor(Math.min((width - 10) / cols, (height - 10) / rows));
            super(width, height, cellWidth, cols, rows);
            this.towers = [];
            this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 5, this.convertGridToPixel(new point_1.Point(0, 1))));
            this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 5, this.convertGridToPixel(new point_1.Point(1, 1))));
            this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 5, this.convertGridToPixel(new point_1.Point(2, 1))));
            this.grid = new grid_1.Grid(cols, rows);
            this.grid
                .set(new point_1.Point(0, 1), this.towers[0])
                .set(new point_1.Point(1, 1), this.towers[1])
                .set(new point_1.Point(2, 1), this.towers[2]);
            this.waypoints = new path_1.Path([
                new point_1.Point(0, 0),
                new point_1.Point(5, 0),
                new point_1.Point(0, 5),
                new point_1.Point(9, 9)
            ]);
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
        checkPath() {
            let cur = this.waypoints.getRoot();
            while (cur != null) {
                let next = this.waypoints.getNext(cur);
                if (next === null) {
                    cur = null;
                    continue;
                }
                if (null === a_star_1.AStar(this.grid, cur, next)) {
                    return false;
                }
                cur = next;
            }
            return true;
        }
        addTower(tower, point) {
            this.grid.set(point, tower);
            if (!this.checkPath()) {
                this.removeTower(point);
            }
            return this;
        }
        removeTower(point) {
            this.grid.unset(point);
            return this;
        }
    }
    exports.LevelOne = LevelOne;
});
