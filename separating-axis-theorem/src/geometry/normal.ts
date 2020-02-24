import {Line} from './line';
import {Polygon} from './polygon';
import {Point} from './point';
import {Projection} from './projection';

export class Normal
{
    private _line: Line;
    private _unitVector: Point;
    private _projections: Projection[];
    private _guides: Line[];

    constructor(line: Line)
    {
        this._line        = line;
        this._unitVector  = line.end.clone().sub(line.start).unit();
        this._projections = [];
        this._guides = [];
    }

    resetProjections(): Normal
    {
        this._projections = [];
        this._guides = [];

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

        let maxDist = -1;
        let s = null;
        let e = null;
        let v1 = null;
        let v2 = null;
        dots.map((dot, index) => {
            dots.map((d2, i) => {
                let dist = dot.dist(d2);
                if (dist > maxDist) {
                    s = dot;
                    e = d2;
                    v1 = p.vertices[index];
                    v2 = p.vertices[i];
                    maxDist = dist;
                }
            });
        });

        this._projections.push(new Projection(new Line(s, e)));
        this._guides.push(new Line(s, v1));
        this._guides.push(new Line(e, v2));

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

    hasCollision(): boolean
    {
        let colliding = false;
        this._projections.map((projection, index) => {
            this._projections.map((proj, i) => {
                if (i === index) {
                    return;
                }
                if (proj.overlaps(projection)) {
                    colliding = true;
                }
            });
        });

        return colliding;
    }

    get line(): Line
    {
        return this._line;
    }

    get projections(): Projection[]
    {
        return this._projections;
    }

    get guides(): Line[]
    {
        return this._guides;
    }
}