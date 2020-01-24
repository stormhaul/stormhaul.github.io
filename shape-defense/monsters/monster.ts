import {Point} from '../helpers/point';
import {Angle} from '../helpers/angle';
import {RenderableParent} from '../rendering/renderable.parent';
import {Context} from '../rendering/context';
import {AttackableInterface} from './attackable.interface';
import {Armor} from './armor/armor';

export abstract class Monster extends RenderableParent implements AttackableInterface
{
    protected position: Point;
    private path: Array<Point>;
    private currentPathTarget: number; // index of path that we are targeting
    private speed: number;
    private health: number;
    private maxHealth: number;
    private liveCost: number;
    private goldValue: number;
    private direction: Angle; // 0 degrees starts in positive x axis direction is positive in the clockwise direction.
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
    protected constructor(position: Point, path: Array<Point>, speed: number, health: number, liveCost: number, goldValue: number, armor: Armor)
    {
        super();

        this.position          = position;
        this.path              = path;
        this.currentPathTarget = 0;
        this.speed             = speed;
        this.health            = health;
        this.maxHealth         = health;
        this.liveCost          = liveCost;
        this.goldValue         = goldValue;
        this.armor             = armor;
        this.direction         = new Angle(Math.atan2(
            path[this.currentPathTarget+1].y - path[this.currentPathTarget].y,
            path[this.currentPathTarget+1].x - path[this.currentPathTarget].x
        ) * 180 / Math.PI - 90);
        console.log(this);
    }

    setDirection(angle: Angle): this
    {
        this.direction = angle;

        return this;
    }

    getDirection(): Angle
    {
        return this.direction;
    }

    move(): void
    {
        let target = this.path[this.currentPathTarget];
        if (!target) {
            return;
        }
        let dist = target.dist(this.position);
        let leftover = dist;
        if (dist < this.speed) {
            leftover = this.speed - dist;
            this.position = target;
        }

        if (leftover != dist) {
            target = this.path[++this.currentPathTarget];

            if (!target) {
                // monster escaped
                return;
            }
        }

        this.position = this.position.toward(target, leftover);
        this.direction         = new Angle(Math.atan2(
            target.y - this.position.y,
            target.x - this.position.x
        ) * 180 / Math.PI - 90);
    }

    hit(damage: number): void
    {
        this.health -= damage;

        if (this.health <= 0) {
            //dies event
        }
    }

    escape(): void
    {
        //escape event
    }

    render(context: Context, offset: Point): void
    {
        /**
         * @todo draw health bar.
         */

        let barWidth  = 20;
        let barOffset = 15;
        context.rect(this.position.sub(new Point(barWidth / 2, barOffset)), barWidth, 2, 0, true, 'red', false, '');
        context.rect(
            this.position.sub(new Point(barWidth / 2, barOffset)),
            Math.min(barWidth * this.health / this.maxHealth, barWidth),
            2,
            0,
            true,
            'green',
            false,
            ''
        );
    }

    attacked(amount: number): this
    {
        this.health -= amount;

        return this;
    }

    getArmorType(): Armor
    {
        return this.armor;
    }
}