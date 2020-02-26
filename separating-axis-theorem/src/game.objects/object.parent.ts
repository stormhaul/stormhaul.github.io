import {Point} from '../geometry/point';
import {Polygon} from '../geometry/polygon';
import {Context} from '../rendering/context';

export abstract class ObjectParent
{
    position: Point;
    polygons: Polygon[];

    getMargin(): number
    {
        let max = 0;
        this.polygons.map(poly => {
            let dist = poly.distFurthestFrom(this.position);
            if (dist >  max) {
                max = dist;
            }
        });
        return max;
    };

    abstract render(context: Context);
}