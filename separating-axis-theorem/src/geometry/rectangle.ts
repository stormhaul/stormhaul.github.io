import {Polygon} from './polygon';
import {Point} from './point';
import {Line} from './line';

/**
 * @todo continue implementing Dunno if I should refactor polygon into an interface containing regular and irrecgular polygons.
 *     benefit would be allowing the construction of irregular polygons like Rectangles.
 */
export class Rectangle extends Polygon
{
    private width: number;
    private height: number;
    constructor(center: Point, width: number, height: number)
    {
        super(center, 4, width);
    }

    protected generateVertices(): Point[]
    {
        return [];
    }

    protected generateEdges(): Line[]
    {
        return [];
    }

    protected generateNormals(): Line[]
    {
        return [];
    }
}