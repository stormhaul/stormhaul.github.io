import {RenderableParent} from '../rendering/renderable.parent';
import {Point} from '../helpers/point';
import {Context} from '../rendering/context';
import {Monster} from "../monsters/monster";

export abstract class Tower extends RenderableParent
{
    protected range: number; // Range in grid cells Manhattan distance
    protected target: Monster;
    protected position: Point; // Grid position

    render(context: Context, offset: Point): void
    {
    }

    abstract attackTarget(): Tower;

    setTarget(enemies: Array<Monster>): Tower
    {
        if (this.target !== undefined && this.target !== null && this.target.getHealth() > 0 && this.getDistTo(this.target) <= this.range) {
            // Do not allow target switching yet.
            return this;
        }
        let bestTarget = null;
        let escapePriority = 0;
        enemies.map(x => {
            let y;
            if (this.getDistTo(x) <= this.range && (y = x.getNearnessToEscapeValue()) > escapePriority) {
                bestTarget = x;
                escapePriority = y;
            }
        });

        this.target = bestTarget;
        return this;
    }

    /**
     * Get's the Manhattan distance to monster
     * @param monster
     */
    getDistTo(monster: Monster): number
    {
        let mPos = monster.getPosition();

        return Math.floor(Math.abs(mPos.x - this.position.x)) + Math.floor(Math.abs(mPos.y - this.position.y));
    }
}