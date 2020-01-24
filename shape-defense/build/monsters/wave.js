define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Wave {
        constructor(monsters, randomizeOrder) {
            this.spawnCounter = 0;
            this.monsters = monsters;
            if (randomizeOrder) {
                this.randomizeOrder();
            }
        }
        randomizeOrder() {
            let currentIndex = this.monsters.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex--);
                temporaryValue = this.monsters[currentIndex];
                this.monsters[currentIndex] = this.monsters[randomIndex];
                this.monsters[randomIndex] = temporaryValue;
            }
        }
        getNextSpawn() {
            if (this.spawnCounter >= this.monsters.length) {
            }
            return this.monsters[this.spawnCounter++];
        }
    }
    exports.Wave = Wave;
});
