define(["require", "exports", "../rendering/renderable.parent"], function (require, exports, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Monster extends renderable_parent_1.RenderableParent {
        constructor(position, path, speed, health, liveCost, goldValue, armor) {
            super();
            this.position = position;
            this.path = path;
            this.speed = speed;
            this.health = health;
            this.maxHealth = health;
            this.liveCost = liveCost;
            this.goldValue = goldValue;
            this.armor = armor;
        }
        setDirection(angle) {
            this.direction = angle;
            return this;
        }
        getDirection() {
            return this.direction;
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
        render(context, offset) {
        }
        attacked(amount) {
            this.health -= amount;
            return this;
        }
        getArmorType() {
            return this.armor;
        }
    }
    exports.Monster = Monster;
});
