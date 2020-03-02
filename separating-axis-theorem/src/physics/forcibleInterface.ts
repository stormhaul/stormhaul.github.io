import {Point} from '../geometry/point';
import {Force} from './force';

export interface ForcibleInterface
{
    position: Point;
    velocity: Point;
    acceleration: Point;
    mass: number;
    affectedByGravity: boolean;
    immobile: boolean;
    clippable: boolean;

    applyForce(force: Force);
    accelerate();
    move();
}