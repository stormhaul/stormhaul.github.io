define(["require", "exports", "../physics/force", "../geometry/point"], function (require, exports, force_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PhysicsController {
        constructor() {
            this.ct = 0;
            this.registered = [];
            this.gravity = new force_1.Force(new point_1.Point(0, .1));
        }
        register(item) {
            item.applyForce(this.gravity.multiplied(item.mass));
            this.registered.push(item);
            return this.ct++;
        }
        tick() {
            return this.applyForces()
                .accelerate()
                .move();
        }
        ;
        applyForces() {
            return this;
        }
        accelerate() {
            this.registered.map(item => {
                if (!item.immobile) {
                    item.accelerate();
                }
            });
            return this;
        }
        move() {
            this.registered.map(item => {
                if (!item.immobile) {
                    item.move();
                }
            });
            return this;
        }
        calculateSpringForce() {
        }
    }
    exports.PhysicsController = PhysicsController;
});
