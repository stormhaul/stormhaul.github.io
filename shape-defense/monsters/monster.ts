import {Point} from "../helpers/point";
import {Angle} from "../helpers/angle";
import {RenderableParent} from "../rendering/renderable.parent";
import {Context} from "../rendering/context";
import {AttackableInterface} from "./attackable.interface";
import {Armor} from "./armor/armor";

export abstract class Monster extends RenderableParent implements AttackableInterface {
    protected position: Point;
    private path: Array<Point>;
    private speed: number;
    private health: number;
    private maxHealth: number;
    private liveCost: number;
    private goldValue: number;
    private direction: Angle;
    private armor: Armor;

    /**
     * @param position
     * @param path
     * @param speed
     * @param health
     * @param liveCost
     * @param goldValue
     * @param armor
     */
    protected constructor(position: Point, path: Array<Point>, speed: number, health: number, liveCost: number, goldValue: number, armor: Armor) {
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

    attacked(amount: number): this {
        this.health -= amount;

        return this;
    }

    getArmorType(): Armor {
        return this.armor;
    }
}