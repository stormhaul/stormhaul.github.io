define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
