define(["require", "exports", "../helpers/a.star"], function (require, exports, a_star_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Path = void 0;
    class Path {
        constructor(waypoints) {
            if (waypoints.length < 2) {
                throw new Error('Path must contain more than 1 waypoint');
            }
            let allUnique = true;
            waypoints.map((waypoint, i) => {
                waypoints.map((wp2, j) => {
                    if (i === j) {
                        return;
                    }
                    if (waypoint.is(wp2)) {
                        allUnique = false;
                    }
                });
            });
            if (!allUnique) {
                throw new Error('Waypoints must be unique.');
            }
            this.root = waypoints[0];
            this.points = waypoints;
        }
        getFullPath(grid) {
            let points = [];
            for (let i = 0; i < this.points.length - 1; i++) {
                points.push(...(0, a_star_1.AStar)(grid, this.points[i], this.points[i + 1]));
            }
            return points;
        }
        getNext(prev) {
            let i = 0;
            for (; i < this.points.length; i++) {
                let p = this.points[i];
                if (prev.is(p)) {
                    break;
                }
            }
            if (this.points[i + 1] !== undefined) {
                return this.points[i + 1];
            }
            return null;
        }
        getRoot() {
            return this.root;
        }
    }
    exports.Path = Path;
});
