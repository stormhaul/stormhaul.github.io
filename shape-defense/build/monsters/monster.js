define(["require", "exports", "../helpers/point", "../helpers/angle", "../rendering/renderable.parent"], function (require, exports, point_1, angle_1, renderable_parent_1) {
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
            this.direction = new angle_1.Angle(Math.atan2(path[1].y - path[0].y, path[1].x - path[0].x) * 180 / Math.PI - 90);
            console.log(this);
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
            let barWidth = 20;
            let barOffset = 15;
            context.rect(this.position.sub(new point_1.Point(barWidth / 2, barOffset)), barWidth, 2, 0, true, 'red', false, '');
            context.rect(this.position.sub(new point_1.Point(barWidth / 2, barOffset)), Math.min(barWidth * this.health / this.maxHealth, barWidth), 2, 0, true, 'green', false, '');
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
