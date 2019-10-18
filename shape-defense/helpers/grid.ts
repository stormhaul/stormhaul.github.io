import {Point} from './point';
import {Map} from './map.interface';

/**
 * For convention Point.x is the column index, while Point.y is the row index
 */
export class Grid {
    private grid: Map = {};
    private cols: number;
    private rows: number;
    private granularity: number;

    constructor(cols: number, rows: number, granularity?: number) {
        this.cols = cols;
        this.rows = rows;

        for (let i = 0; i < rows; i++) {
            this.grid[i] = {};
            for (let j = 0; j < cols; j++) {
                this.grid[i][j] = false;
            }
        }

        if (granularity !== undefined && granularity != 0) {
            this.granularity = granularity;
        } else {
            this.granularity = 1;
        }
    }

    get(p: Point) {
        if (this.grid[p.y][p.x] === undefined) {
            throw new Error('Invalid Access, those coordinates were not initialized');
        }

        return this.grid[p.y][p.x];
    }

    set(p: Point, v) {
        if (this.grid[p.y][p.x] === undefined) {
            throw new Error('Invalid Access, those coordinates were not initialized');
        }

        this.grid[p.y][p.x] = v;
    }

    unset(p: Point) {
        this.set(p, false);
    }

    getGranularity(): number
    {
        return this.granularity;
    }
}