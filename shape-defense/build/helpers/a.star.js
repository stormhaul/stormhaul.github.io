define(["require", "exports", "./point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AStar = void 0;
    function AStar(grid, start, goal) {
        let ptk = (p) => {
            return p.x + ',' + p.y;
        };
        let ktp = (k) => {
            let xy = k.split(',');
            return new point_1.Point(Number.parseInt(xy[0]), Number.parseInt(xy[1]));
        };
        let reconstruct = (cameFrom, current) => {
            let totalPath = [current];
            while (cameFrom[ptk(current)] !== undefined) {
                current = cameFrom[ptk(current)];
                totalPath.unshift(current);
            }
            return totalPath;
        };
        let initMap = (map, cols, rows, value) => {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let p = new point_1.Point(i, j);
                    map[ptk(p)] = value;
                }
            }
            return map;
        };
        let getNeighbors = (p) => {
            let vectors = [
                new point_1.Point(0, 1),
                new point_1.Point(0, -1),
                new point_1.Point(1, 0),
                new point_1.Point(-1, 0)
            ];
            let eightVectors = [
                new point_1.Point(0, 1),
                new point_1.Point(0, -1),
                new point_1.Point(1, 0),
                new point_1.Point(-1, 0),
                new point_1.Point(-1, -1),
                new point_1.Point(-1, 1),
                new point_1.Point(1, -1),
                new point_1.Point(1, 1)
            ];
            let neighbors = [];
            eightVectors.map((v) => {
                try {
                    let next = v.add(p);
                    if (grid.get(next) === false) {
                        neighbors.push(next);
                    }
                }
                catch (e) {
                }
            });
            return neighbors;
        };
        let h = (p) => {
            return Math.sqrt(Math.pow(goal.y - p.y, 2) + Math.pow(goal.x - p.x, 2));
        };
        let findLowestFScore = (fScores, openSet) => {
            let lowest = Infinity;
            let lowNode = null;
            for (let i in openSet) {
                let node = openSet[i];
                let score = fScores[ptk(node)];
                if (score < lowest) {
                    lowest = score;
                    lowNode = node;
                }
            }
            return lowNode;
        };
        let openSet = [start];
        let cameFrom = {};
        let dimensions = grid.getDimensions();
        let gScore = initMap({}, dimensions[0], dimensions[1], Infinity);
        gScore[ptk(start)] = 0;
        let fScore = initMap({}, dimensions[0], dimensions[1], Infinity);
        fScore[ptk(start)] = h(start);
        while (openSet.length > 0) {
            let current = findLowestFScore(fScore, openSet);
            if (current.is(goal)) {
                return reconstruct(cameFrom, current);
            }
            openSet.splice(openSet.indexOf(current), 1);
            let neighbors = getNeighbors(current);
            neighbors.map((neighbor) => {
                let tentativeScore = gScore[ptk(current)] + h(neighbor);
                if (tentativeScore < gScore[ptk(neighbor)]) {
                    cameFrom[ptk(neighbor)] = current;
                    gScore[ptk(neighbor)] = tentativeScore;
                    fScore[ptk(neighbor)] = gScore[ptk(neighbor)] + h(neighbor);
                    if (openSet.indexOf(neighbor) === -1) {
                        openSet.push(neighbor);
                    }
                }
            });
        }
        return null;
    }
    exports.AStar = AStar;
});
