import {Point} from '../helpers/point';
import {AStar} from '../helpers/a.star';
import {Grid} from '../helpers/grid';

export class Path
{
    private root: Point;
    private points: Array<Point>;

    constructor(waypoints: Array<Point>)
    {
        if (waypoints.length < 2) {
            throw new Error('Path must contain more than 1 waypoint');
        }

        let allUnique = true;
        waypoints.map(
            (waypoint, i) =>
            {
                waypoints.map(
                    (wp2, j) =>
                    {
                        if (i === j) {
                            return;
                        }

                        if (waypoint.is(wp2)) {
                            allUnique = false;
                        }
                    }
                );
            }
        );

        if (!allUnique) {
            throw new Error('Waypoints must be unique.');
        }

        this.root   = waypoints[0];
        this.points = waypoints;
    }

    public getFullPath(grid: Grid): Array<Point>
    {
        let points = [];
        for (let i = 0; i < this.points.length-1; i++) {
            points.push(...AStar(grid, this.points[i], this.points[i+1]));
        }
        return points;
    }

    public getNext(prev: Point): Point | null
    {
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

    public getRoot(): Point
    {
        return this.root;
    }
}