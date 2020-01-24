import {RenderableParent} from '../rendering/renderable.parent';
import {Point} from '../helpers/point';
import {Context} from '../rendering/context';

export abstract class Tower extends RenderableParent
{
    render(context: Context, offset: Point): void
    {
    }
}