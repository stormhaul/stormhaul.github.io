import {Grid} from "./grid";
import {Point} from "./point";

/**
 * Finds the path from start to goal on grid, if it doesn't exist then returns null
 *
 * Assumes any value other than false to be closed.
 * @param grid
 * @param start
 * @param goal
 */
export function AStar(grid: Grid, start: Point, goal: Point): Array<Point>|null {
    let ptk = (p: Point): string => {
        return p.x + ',' + p.y;
    };

    let ktp = (k: string): Point => {
        let xy = k.split(',');
        return new Point(Number.parseInt(xy[0]), Number.parseInt(xy[1]));
    };

    let reconstruct = (cameFrom, current): Array<Point> => {
        let totalPath = [current];
        while(cameFrom[ptk(current)] !== undefined) {
            current = cameFrom[ptk(current)];
            totalPath.unshift(current);
        }
        return totalPath;
    };

    let initMap = (map, cols, rows, value) => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let p = new Point(i, j);
                map[ptk(p)] = value;
            }
        }

        return map;
    };

    let getNeighbors = (p: Point) => {
        let vectors = [
            new Point(0, 1),
            new Point(0, -1),
            new Point(1, 0),
            new Point(-1, 0)
        ];

        let neighbors = [];
        vectors.map((v: Point) => {
            try {
                let next = v.add(p);

                if (grid.get(next) === false) {
                    neighbors.push(next);
                }
            } catch (e) {

            }
        });

        return neighbors
    };

    let h = (p: Point) => {
        //manhattan distance heuristic
        //return Math.abs(goal.y - p.y) + Math.abs(goal.x - p.x);

        //euclidian distance
        return Math.sqrt(Math.pow(goal.y - p.y, 2) + Math.pow(goal.x - p.x, 2));
    };

    let findLowestFScore = (fScores, openSet): Point => {
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

    while(openSet.length > 0) {
        let current = findLowestFScore(fScore, openSet);
        if (current.is(goal)) {
            return reconstruct(cameFrom, current);
        }

        openSet.splice(openSet.indexOf(current), 1);
        let neighbors = getNeighbors(current);
        neighbors.map((neighbor) => {
            let tentativeScore = gScore[ptk(current)] + 1;
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