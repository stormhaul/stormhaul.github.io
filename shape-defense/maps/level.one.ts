import {GameMap} from "./game.map";
import {Grid} from "../helpers/grid";
import {Path} from "./path";
import {Point} from "../helpers/point";
import {AStar} from "../helpers/a.star";
import {Tower} from "../towers/tower";

export class LevelOne extends GameMap {

    constructor() {
        super();

        this.grid = new Grid(10, 10);
        this.grid
            .set(new Point(0,1), 1)
            .set(new Point(1,1), 1)
            .set(new Point(2,1), 1);
        let path = new Path(
            [
                new Point(0, 0),
                new Point(5, 0),
                new Point(0, 5),
                new Point(9, 9)
            ]
        );

        this.deltaTime();
        let cur = path.getRoot();
        while (cur != null) {
            let next = path.getNext(cur);
            if (next === null) {
                cur = null;
                continue;
            }
            console.log(
                AStar(
                    this.grid,
                    cur,
                    next
                )
            );
            cur = next;
        }
        console.log(this.deltaTime());
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

    private addTower(tower: Tower, point: Point): this {
        this.grid.set(point, tower);

        return this;
    }

    private removeTower(point: Point): this {
        this.grid.unset(point);

        return this;
    }
}