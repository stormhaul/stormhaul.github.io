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
            this.renderWaypoints(context, offset);
        }
        renderGrid(context, offset) {
            let sum = this.gridOrigin.add(this.getParentOffset());
            for (let i = 0; i <= this.cols; i++) {
                context.line(new point_1.Point(sum.x + i * this.cellWidth, sum.y), new point_1.Point(sum.x + i * this.cellWidth, sum.y + this.rows * this.cellWidth), 1, 'white');
            }
            for (let i = 0; i <= this.cols; i++) {
                context.line(new point_1.Point(sum.x, sum.y + i * this.cellWidth), new point_1.Point(sum.x + this.rows * this.cellWidth, sum.y + i * this.cellWidth), 1, 'white');
            }
            this.renderTowers(context, offset);
        }
        renderTowers(context, offset) {
            this.towers.map((tower) => {
                tower.render(context, this.getParentOffset());
            });
        }
        renderWaypoints(context, offset) {
            let sum = this.gridOrigin.add(this.getParentOffset());
            let cur = this.waypoints.getRoot();
            while (cur) {
                context.circle(cur.mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), this.cellWidth / 3, 0, true, 'blue', false, '');
                cur = this.waypoints.getNext(cur);
            }
            let prev = null;
            cur = this.waypoints.getRoot();
            while (cur) {
                if (prev != null) {
                    let path = a_star_1.AStar(this.grid, prev, cur);
                    for (let i = 0; i < path.length - 1; i++) {
                        context.line(path[i].mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), path[i + 1].mult(this.cellWidth).add(sum).add(new point_1.Point(this.cellWidth / 2, this.cellWidth / 2)), 1, 'green');
                    }
                }
                prev = cur;
                cur = this.waypoints.getNext(cur);
            }
        }
        convertGridToPixel(point) {
            return point.mult(this.cellWidth).add(this.gridOrigin).add(this.getParentOffset());
        }
        convertPixelToGrid(point) {
            return point.sub(this.getParentOffset()).sub(this.gridOrigin).mult(1 / this.cellWidth);
        }
    }
    exports.GameMap = GameMap;
});
