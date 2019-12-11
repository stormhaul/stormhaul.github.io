define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Monster {
        constructor(position, path, speed, health, liveCost, goldValue) {
            this.position = position;
            this.path = path;
            this.speed = speed;
            this.health = health;
            this.liveCost = liveCost;
            this.goldValue = goldValue;
        }
        move() {
        }
        hit(damage) {
            this.health -= damage;
            if (this.health <= 0) {
            }
        }
        escape() {
        }
    }
    exports.Monster = Monster;
});
