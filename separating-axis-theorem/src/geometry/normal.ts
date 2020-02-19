import {Line} from './line';
import {Polygon} from './polygon';
import {Point} from './point';
import {Projection} from './projection';

export class Normal
{
    private _line: Line;
    private _unitVector: Point;
    private _projections: Projection[];

    constructor(line: Line)
    {
        this._line        = line;
        this._unitVector  = line.end.clone().sub(line.start).unit();
        this._projections = [];
    }

    resetProjections(): Normal
    {
        this._projections = [];

        return this;
    }

    projectPolygon(p: Polygon): Normal
    {
        let dots = [];
        p.vertices.map(
            vertex => {
                dots.push(vertex.projectedOnto(this._line));
            }
        );

        let min = Number.POSITIVE_INFINITY;
        let minDot = null;
        let max = Number.NEGATIVE_INFINITY;
        let maxDot = null;
        dots.map(dot => {
            let dist = dot.dist(this._line.midpoint);
            if (dist < min) {
                minDot = dot;
                min = dist
            }
            if (dist > max) {
                maxDot = dot;
                max = dist;
            }
        });
        this._projections.push(new Projection(new Line(minDot, maxDot)));

        this._projections.map(
            (projection, index) => {
                this._projections.map(
                    (proj, i) => {
                        if (i === index) {
                            return;
                        }
                        if (projection.overlaps(proj)) {
                            projection.isIntersecting = true;
                            proj.isIntersecting = true;
                        }
                    }
                )
            }
        );

        return this;
    }

    get line(): Line
    {
        return this._line;
    }

    get projections(): Projection[]
    {
        return this._projections;
    }
}