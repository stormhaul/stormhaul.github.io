define(["require", "exports", "../rendering/renderable.parent", "../helpers/point", "../helpers/a.star"], function (require, exports, renderable_parent_1, point_1, a_star_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameMap extends renderable_parent_1.RenderableParent {
        constructor(width, height, cellWidth, cols, rows) {
            super();
            this.time = Date.now();
            this.gridOrigin = new point_1.Point((width - (cellWidth * cols)) / 2, (height - (cellWidth * rows)) / 2);
            this.cellWidth = cellWidth;
            this.cols = cols;
            this.rows = rows;
            this.monsters = [];
            this.waves = [];
            this.activeWave = 0;
        }
        getGrid() {
            return this.grid;
        }
        deltaTime() {
            let now = Date.now();
            let dt = now - this.time;
            this.time = now;
            return dt;
        }
        render(context, offset) {
            this.renderGrid(context, offset);
            this.renderTowers(context, offset);
            this.renderWaypoints(context, offset);
            this.renderMonsters(context, offset);
        }
        renderGrid(context, offset) {
            let sum = this.gridOrigin.add(this.getParentOffset());
            for (let i = 0; i <= this.cols; i++) {
                context.line(new point_1.Point(sum.x + i * this.cellWidth, sum.y), new point_1.Point(sum.x + i * this.cellWidth, sum.y + this.rows * this.cellWidth), 1, 'white');
            }
            for (let i = 0; i <= this.cols; i++) {
                context.line(new point_1.Point(sum.x, sum.y + i * this.cellWidth), new point_1.Point(sum.x + this.rows * this.cellWidth, sum.y + i * this.cellWidth), 1, 'white');
            }
        }
        renderTowers(context, offset) {
            this.towers.map((tower) => {
                tower.render(context, offset);
            });
        }
        renderWaypoints(context, offset) {
            let colors = [
                'rgba(230, 25,  75,  .4)',
                'rgba(60,  180, 75,  .4)',
                'rgba(255, 225, 25,  .4)',
                'rgba(67,  99,  216, .4)',
                'rgba(245, 130, 49,  .4)',
                'rgba(145, 30,  180, .4)',
                'rgba(70,  240, 240, .4)',
                'rgba(240, 50,  230, .4)',
                'rgba(188, 246, 12,  .4)',
                'rgba(250, 190, 190, .4)',
                'rgba(0,   128, 128, .4)',
                'rgba(230, 190, 255, .4)',
                'rgba(154, 99,  36,  .4)',
                'rgba(255, 250, 200, .4)',
                'rgba(128, 0,   128, .4)',
                'rgba(170, 255, 195, .4)',
                'rgba(128, 128, 0,   .4)',
                'rgba(255, 216, 177, .4)',
                'rgba(0,   117, 117, .4)',
                'rgba(128, 128, 128, .4)'
            ];
            let sum = this.gridOrigin.add(this.getParentOffset());
            let cur = this.waypoints.getRoot();
            while (cur) {
                context.circle(cur.mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), this.cellWidth / 3, 0, true, 'blue', false, '');
                cur = this.waypoints.getNext(cur);
            }
            let prev = null;
            cur = this.waypoints.getRoot();
            let ct = 0;
            while (cur) {
                if (prev != null) {
                    let sel = colors[ct % colors.length];
                    ct++;
                    let path = a_star_1.AStar(this.grid, prev, cur);
                    for (let i = 0; i < path.length - 1; i++) {
                        context.line(path[i].mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), path[i + 1].mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), 1, sel);
                    }
                }
                prev = cur;
                cur = this.waypoints.getNext(cur);
            }
        }
        renderMonsters(context, offset) {
            this.monsters.map(monster => {
                monster.render(context, offset);
            });
        }
        convertGridToPixel(point) {
            return point.add(new point_1.Point(0, 1)).mult(this.cellWidth).add(this.gridOrigin);
        }
    }
    exports.GameMap = GameMap;
});
