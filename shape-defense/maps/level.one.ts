import {GameMap} from "./game.map";
import {Grid} from "../helpers/grid";
import {Path} from "./path";
import {Point} from "../helpers/point";
import {AStar} from "../helpers/a.star";
import {Tower} from "../towers/tower";
import {SquareTower} from "../towers/square.tower";

export class LevelOne extends GameMap {
    /**
     * @param width in px of the canvas section we can draw to
     * @param height in px of the canvas section we can draw to
     */
    constructor(width: number, height: number) {
        let cols = 10;
        let rows = 10;
        let cellWidth = Math.floor(Math.min((width - 10) / cols, (height - 10) / rows));
        super(width, height, cellWidth, cols, rows);

        this.towers = [];
        this.towers.push(new SquareTower(this.cellWidth - 5, this.convertGridToPixel(new Point(0,1))));
        this.towers.push(new SquareTower(this.cellWidth - 5, this.convertGridToPixel(new Point(1,1))));
        this.towers.push(new SquareTower(this.cellWidth - 5, this.convertGridToPixel(new Point(2,1))));

        this.grid = new Grid(cols, rows);
        this.grid
            .set(new Point(0,1), this.towers[0])
            .set(new Point(1,1), this.towers[1])
            .set(new Point(2,1), this.towers[2]);
        this.waypoints = new Path(
            [
                new Point(0, 0),
                new Point(5, 0),
                new Point(0, 5),
                new Point(9, 9)
            ]
        );
    }

    public setup(): this {

        return this;
    }

    public start(): this {
        // calls deltatime to reset time in case we paused
        this.deltaTime();

        return this;
    }

    public stop(): this {

        return this;
    }

    private checkPath(): boolean {
        let cur = this.waypoints.getRoot();
        while (cur != null) {
            let next = this.waypoints.getNext(cur);
            if (next === null) {
                cur = null;
                continue;
            }
            if (null === AStar(this.grid, cur, next)) {
                return false;
            }
            cur = next;
        }

        return true;
    }

    private addTower(tower: Tower, point: Point): this {
        this.grid.set(point, tower);

        // Check that path isn't blocked.
        if (!this.checkPath()) {
            // path blocked so undo.
            this.removeTower(point);
        }

        return this;
    }

    private removeTower(point: Point): this {
        this.grid.unset(point);

        return this;
    }
}