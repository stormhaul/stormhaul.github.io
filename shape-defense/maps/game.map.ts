import {Grid} from "../helpers/grid";

export abstract class GameMap {
    protected grid: Grid;
    protected time: number = Date.now();

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
}