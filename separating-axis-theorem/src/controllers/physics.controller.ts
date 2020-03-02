import {ForcibleInterface} from '../physics/forcibleInterface';
import {Force} from '../physics/force';
import {Point} from '../geometry/point';

export class PhysicsController
{
    private registered: ForcibleInterface[];
    private ct: number = 0;
    private gravity: Force;

    constructor()
    {
        this.registered = [];
        this.gravity = new Force(new Point(0, .1));
    }

    register(item: ForcibleInterface): number
    {
        item.applyForce(this.gravity.multiplied(item.mass));
        this.registered.push(item);
        return this.ct++;
    }

    tick(): PhysicsController
    {
        return this.applyForces()
            .accelerate()
            .move();
    };

    applyForces(): PhysicsController
    {
        return this;
    }

    accelerate(): PhysicsController
    {
        this.registered.map(item => {
            if (!item.immobile) {
                item.accelerate();
            }
        });

        return this;
    }

    move(): PhysicsController
    {
        this.registered.map(item => {
            if (!item.immobile) {
                item.move();
            }
        });

        return this;
    }

    calculateSpringForce()
    {

    }
}