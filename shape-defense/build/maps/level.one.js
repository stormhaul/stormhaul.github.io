define(["require", "exports", "./game.map", "../helpers/grid", "./path", "../helpers/point", "../helpers/a.star", "../monsters/triangle.monster", "../monsters/wave"], function (require, exports, game_map_1, grid_1, path_1, point_1, a_star_1, triangle_monster_1, wave_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LevelOne extends game_map_1.GameMap {
        constructor(width, height) {
            let cols = 20;
            let rows = 20;
            let cellWidth = Math.floor(Math.min((width - 10) / cols, (height - 10) / rows));
            super(width, height, cellWidth, cols, rows);
            this.towers = [];
            this.grid = new grid_1.Grid(cols, rows);
            let contains = (arr, item) => {
                let found = false;
                arr.map((i) => {
                    if (i.dist(item) <= 2) {
                        found = true;
                    }
                });
                return found;
            };
            let points = [];
            while (points.length < 3) {
                let x = Math.floor(Math.random() * cols);
                let y = Math.floor(Math.random() * rows);
                let p = new point_1.Point(x, y);
                if (contains(points, p)) {
                }
                else {
                    points.push(p);
                }
            }
            this.waypoints = new path_1.Path(points);
            let path = this.waypoints.getFullPath(this.grid);
            path.map(item => this.convertGridToPixel(item));
            let mons = [];
            for (let i = 0; i < 10; i++) {
                mons.push(new triangle_monster_1.TriangleMonster(this.convertGridToPixel(this.waypoints
                    .getRoot()
                    .add(new point_1.Point(0.5, 1.5))), path));
            }
            let wave = new wave_1.Wave(mons);
            this.monsters.push(wave.getNextSpawn());
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
                console.log(a_star_1.AStar(this.grid, cur, next));
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
