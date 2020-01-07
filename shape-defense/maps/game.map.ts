import {Grid} from "../helpers/grid";
import {RenderableParent} from "../rendering/renderable.parent";
import {Path} from "./path";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";
import {AStar} from "../helpers/a.star";
import {Tower} from "../towers/tower";

export abstract class GameMap extends RenderableParent {
    protected grid: Grid;
    protected time: number = Date.now();
    protected waypoints: Path;
    protected gridOrigin: Point;
    protected cellWidth: number;
    protected cols: number;
    protected rows: number;
    protected towers: Array<Tower>;

    /**
     * Note, each grid index refers to the top left corner of the cell for the purposes of rendering.
     * @param width of pane in px
     * @param height of pane in px
     * @param cellWidth width of cell of grid
     * @param cols number of cols in grid
     * @param rows number of rows in grid
     */
    protected constructor(width: number, height: number, cellWidth: number, cols: number, rows: number) {
        super();

        this.gridOrigin = new Point(
            (width - (cellWidth * cols)) / 2,
            (height - (cellWidth * rows)) / 2
        );
        this.cellWidth  = cellWidth;
        this.cols       = cols;
        this.rows       = rows;
    }

    // Runs any initialization needed to revert map to base state
    public abstract setup(): this;

    public abstract start(): this;

    public abstract stop(): this;

    public getGrid(): Grid {
        return this.grid;
    }

    /**
     * Updates internal time marker and returns the time that passed since last call.
     */
    public deltaTime(): number {
        let now = Date.now();
        let dt = now -  this.time;
        this.time = now;

        return dt;
    }

    public render(context: Context, offset: Point): void {
        this.renderGrid(context, offset);
        this.renderTowers(context, offset);
        this.renderWaypoints(context, offset);
    }

    private renderGrid(context: Context, offset: Point): void {
        let sum = this.gridOrigin.add(this.getParentOffset());

        for (let i = 0; i <= this.cols; i++) {
            context.line(
                new Point(sum.x + i * this.cellWidth, sum.y),
                new Point(sum.x + i * this.cellWidth, sum.y + this.rows * this.cellWidth),
                1,
                'white'
            );
        }

        for (let i = 0; i <= this.cols; i++) {
            context.line(
                new Point(sum.x, sum.y + i * this.cellWidth),
                new Point(sum.x + this.rows * this.cellWidth, sum.y + i * this.cellWidth),
                1,
                'white'
            );
        }
    }

    private renderTowers(context: Context, offset: Point): void {
        this.towers.map((tower) => {
            tower.render(context, offset);
        });
    }

    private renderWaypoints(context: Context, offset: Point): void {
        let sum = this.gridOrigin.add(this.getParentOffset());

        let cur = this.waypoints.getRoot();
        while (cur) {
            context.circle(cur.mult(this.cellWidth).add(sum).add(new Point(this.cellWidth / 2, this.cellWidth / 2)), this.cellWidth / 3, 0, true, 'blue', false, '');

            cur = this.waypoints.getNext(cur);
        }

        let prev = null;
        cur = this.waypoints.getRoot();
        while (cur) {
            if (prev != null) {
                let path = AStar(this.grid, prev, cur);
                for (let i = 0; i < path.length - 1; i++) {
                    context.line(
                        path[i].mult(this.cellWidth).add(sum).add(new Point(this.cellWidth / 2, this.cellWidth / 2)),
                        path[i+1].mult(this.cellWidth).add(sum).add(new Point(this.cellWidth / 2, this.cellWidth / 2)),
                        1,
                        'green'
                    );
                }
            }

            prev = cur;
            cur = this.waypoints.getNext(cur);
        }
    }

    protected convertGridToPixel(point: Point): Point {
        return point.mult(this.cellWidth).add(this.gridOrigin).add(this.getParentOffset());
    }
}