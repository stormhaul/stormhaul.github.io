define(["require", "exports", "./game.map", "../helpers/grid", "./path", "../helpers/point", "../helpers/a.star", "../towers/square.tower", "../monsters/triangle.monster", "../monsters/wave", "../monsters/timer"], function (require, exports, game_map_1, grid_1, path_1, point_1, a_star_1, square_tower_1, triangle_monster_1, wave_1, timer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelOne = void 0;
    class LevelOne extends game_map_1.GameMap {
        constructor(width, height) {
            let cols = 10;
            let rows = 10;
            let cellWidth = Math.floor(Math.min((width - 10) / cols, (height - 10) / rows));
            super(width, height, cellWidth, cols, rows);
            this.towers = [];
            this.grid = new grid_1.Grid(cols, rows);
            this.setupTestMaze(cols, rows, cellWidth);
            let path = this.waypoints.getFullPath(this.grid).map(item => this.convertGridToPixel(item));
            path.map(item => this.convertGridToPixel(item));
            let mons = [];
            for (let i = 0; i < 10; i++) {
                mons.push(new triangle_monster_1.TriangleMonster(this.convertGridToPixel(this.waypoints
                    .getRoot()), path));
            }
            let wave = new wave_1.Wave(mons);
            this.waveTimer = new timer_1.Timer(0, 1, 10, this.spawnEnemy.bind(this));
            this.waves = [wave];
            this.activeWave = 0;
            this.loop();
        }
        setup() {
            return this;
        }
        setupTestMaze(cols, rows, cellWidth) {
            for (let i = 0; i < 9; i++) {
                let point = new point_1.Point(1, i);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 2; i < 9; i++) {
                let point = new point_1.Point(i, 8);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 1; i < 8; i++) {
                let point = new point_1.Point(8, i);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 0; i < 7; i++) {
                let point = new point_1.Point(6, i);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 3; i < 6; i++) {
                let point = new point_1.Point(i, 6);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 2; i < 5; i++) {
                let point = new point_1.Point(i, 4);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 3; i < 6; i++) {
                let point = new point_1.Point(i, 2);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            for (let i = 3; i < 6; i++) {
                let point = new point_1.Point(i, 1);
                this.towers.push(new square_tower_1.SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new point_1.Point(3, 7))));
                this.grid.set(point, this.towers[i]);
            }
            this.waypoints = new path_1.Path([
                new point_1.Point(0, 0),
                new point_1.Point(5, 0),
                new point_1.Point(0, 5),
                new point_1.Point(9, 9)
            ]);
        }
        setupRandomMaze(cols, rows, cellWidth) {
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
            while (points.length < 10) {
                let x = Math.floor(Math.random() * cols);
                let y = Math.floor(Math.random() * rows);
                let p = new point_1.Point(x, y);
                if (!contains(points, p)) {
                    points.push(p);
                }
            }
            this.waypoints = new path_1.Path(points);
        }
        start() {
            this.deltaTime();
            this.playing = true;
            console.log(this.monsters);
            return this;
        }
        stop() {
            this.playing = false;
            console.log(this.monsters);
            return this;
        }
        loop() {
            if (this.playing) {
                this.deltaTime();
                this.waveTimer.tick();
                this.progressMonsters();
                this.progressTowers();
            }
            setTimeout(this.loop.bind(this), 50);
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
                console.log((0, a_star_1.AStar)(this.grid, cur, next));
                if (null === (0, a_star_1.AStar)(this.grid, cur, next)) {
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
