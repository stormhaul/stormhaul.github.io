import {Point} from "../helpers/point";
import {Angle} from "../helpers/angle";
import {RenderableParent} from "../rendering/renderable.parent";
import {Context} from "../rendering/context";

export abstract class Monster extends RenderableParent{
    protected position: Point;
    private path: Array<Point>;
    private speed: number;
    private health: number;
    private maxHealth: number;
    private liveCost: number;
    private goldValue: number;
    private direction: Angle;

    /**
     * @param position
     * @param path
     * @param speed
     * @param health
     * @param liveCost
     * @param goldValue
     */
    protected constructor(position, path, speed, health, liveCost, goldValue) {
        super();

        this.position = position;
        this.path = path;
        this.speed = speed;
        this.health = health;
        this.maxHealth = health;
        this.liveCost = liveCost;
        this.goldValue = goldValue;
    }

    setDirection(angle: Angle): this {
        this.direction = angle;

        return this;
    }

    getDirection(): Angle {
        return this.direction;
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

    render(context: Context, offset: Point): void {
        /**
         * @todo draw health bar.
         */
    }
}