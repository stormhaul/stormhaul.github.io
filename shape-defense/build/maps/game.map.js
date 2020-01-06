define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameMap {
        constructor() {
            this.time = Date.now();
        }
        getGrid() {
            return this.grid;
        }
        deltaTime() {
            let now = Date.now();
            let dt = now - this.time;
            this.time = now;
            return dt;
        }
    }
    exports.GameMap = GameMap;
});
