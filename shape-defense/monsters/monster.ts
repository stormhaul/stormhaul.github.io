import {Point} from "../helpers/point";

export abstract class Monster {
    private position: Point;
    private path: Array<Point>;
    private speed: number;
    private health: number;
    private liveCost: number;
    private goldValue: number;

    /**
     * @param position
     * @param path
     * @param speed
     * @param health
     * @param liveCost
     * @param goldValue
     */
    constructor(position, path, speed, health, liveCost, goldValue) {
        this.position = position;
        this.path = path;
        this.speed = speed;
        this.health = health;
        this.liveCost = liveCost;
        this.goldValue = goldValue;
    }

    move(): void {

    }

    hit(damage: number): void {
        this.health -= damage;

        if (this.health <= 0) {
            //dies event
        }
    }

    escape(): void {
        //escape event
    }
}