import {ObjectParent} from '../game.objects/object.parent';
import {Config} from '../config';

export class RenderRangeController
{
    private rootObject: ObjectParent;
    private maxMapSize: number;

    constructor(rootObject: ObjectParent, config: Config)
    {
        this.rootObject = rootObject;
        this.maxMapSize = Math.max(config.canvas.width, config.canvas.height);
    }

    getRenderablesInRange(renderables: ObjectParent[]): ObjectParent[]
    {
        let inRange = [];
        let root = this.rootObject.position;
        renderables.map(renderable => {
            let margin = renderable.getMargin();
            if (root.dist(renderable.position) <= this.maxMapSize + margin) {
                inRange.push(renderable);
            }
        });

        return inRange;
    }
}