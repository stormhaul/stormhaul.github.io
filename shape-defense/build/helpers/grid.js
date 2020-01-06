define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Grid {
        constructor(cols, rows, granularity) {
            this.grid = {};
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
            }
            else {
                this.granularity = 1;
            }
        }
        getDimensions() {
            return [this.cols, this.rows];
        }
        get(p) {
            if (this.grid[p.y][p.x] === undefined) {
                throw new Error('Invalid Access, those coordinates were not initialized');
            }
            return this.grid[p.y][p.x];
        }
        set(p, v) {
            if (this.grid[p.y][p.x] === undefined) {
                throw new Error('Invalid Access, those coordinates were not initialized');
            }
            this.grid[p.y][p.x] = v;
            return this;
        }
        unset(p) {
            this.set(p, false);
            return this;
        }
        getGranularity() {
            return this.granularity;
        }
    }
    exports.Grid = Grid;
});
