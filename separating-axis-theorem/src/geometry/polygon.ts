import {Point} from './point';
import {Angle} from './angle';
import {Line} from './line';
import {RadialLine} from './radial.line';
import {Normal} from './normal';

export class Polygon
{
    protected _center: Point;
    protected _sides: number;
    protected _sideLength: number;
    protected _radius: number; // length from center to vertex
    protected _apothem: number; // length from center to midpoint of edges
    protected _interiorAngle: Angle; // Angle Between V1 V2 V3
    protected _centerAngle: Angle; // Angle Between V1 C V2
    protected _vertices: Point[];
    protected _edges: Line[];
    protected _normals: Line[]; // normal for each edge
    protected _orientation: Angle; // Initial angle used when generating the vertices 0 is → 90 is ↓
    protected _attachment: Point|null;
    protected _colliding: boolean;

    constructor(center: Point, sides: number, sideLength: number)
    {
        this._center     = center;
        this._sides      = sides;
        this._sideLength = sideLength;
        this._orientation = new Angle(sides % 2 === 1 ? -90 : -45);

        this._centerAngle = new Angle(360 / this._sides);
        this._interiorAngle = new Angle(180 * (this._sides - 2));

        this._radius = this._sideLength / (2 * Math.sin(Math.PI / this._sides));
        this._apothem = this._radius * Math.cos(Math.PI / this._sides);
        this._attachment = null;

        this.generateGeometries();
    }

    /**
     * Checks if polygon is bounding given point.
     * @param p
     */
    isBounding(p: Point): boolean
    {
        let inside = false;
        this._vertices.map(
            (vertex, index) => {
                if (index+1 === this._vertices.length) {
                    return;
                }

                let x1 = vertex.x,
                    y1 = vertex.y,
                    x2 = this._vertices[index+1].x,
                    y2 = this._vertices[index+1].y;

                let intersect = ((y1 > p.y) != (y2 > p.y))
                    && (p.x < (x2 - x1) * (p.y - y1) / (y2 - y1) + x1);

                if (intersect) {
                    inside = !inside;
                }
            }
        );

        return inside;
    }

    isColliding(p: Polygon): boolean
    {
        let normals = [];

        this._normals.map(normal => {
            if (this.checkNormalsForParallel(normal, normals)) {
                normals.push(normal);
            }
        });

        p.normals.map(normal => {
            if (this.checkNormalsForParallel(normal, normals)) {
                normals.push(normal);
            }
        });

        let constructedNormals = [];
        normals.map(normal => {
            constructedNormals.push(new Normal(normal));
        });

        constructedNormals.map(normal => {
            normal.projectPolygon(this);
            normal.projectPolygon(p);
        });

        let isColliding = true;
        constructedNormals.map(normal => {
            if (!normal.hasCollision()) {
                // if any of the normals lack a collision, then there is no collision yet.
                isColliding = false;
            }
        });

        return isColliding;
    }

    distFurthestFrom(p: Point): number
    {
        let max = 0;
        this._vertices.map(vertex => {
            let dist = vertex.dist(p);
            if (dist > max) {
                max = dist;
            }
        });
        return max;
    }

    private checkNormalsForParallel(needle, haystack): boolean
    {
        let notFound = true;
        haystack.map(line => {
            let vector = line.end.clone().sub(line.start);
            if (Math.abs(vector.unit().dot(needle.end.clone().sub(needle.start).unit())) == 1) { // 0 = perpendicular +/- 1 = parallel
                notFound = false;
            }
        });

        return notFound;
    }

    private generateGeometries()
    {
        this._vertices = this.generateVertices();
        this._edges = this.generateEdges();
        this._normals = this.generateNormals();
    }

    protected generateVertices(): Point[]
    {
        let vertices = [];
        let angle = this._orientation.clone();

        do {
            let radialLine = new RadialLine(this._center, angle, this._radius);
            vertices.push(radialLine.end);
            angle.add(this._centerAngle);
        } while (vertices.length < this.sides);

        return vertices;
    }

    protected generateEdges(): Line[]
    {
        let edges = [];

        this._vertices.map(
            (vertex, index) => {
                edges.push(new Line(vertex, this._vertices[(index + 1) % this._vertices.length]));
            }
        );

        return edges;
    }

    protected generateNormals(): Line[]
    {
        let normals = [];

        this._edges.map(
            edge => {
                normals.push(edge.getNormal());
            }
        );

        return normals;
    }

    public attach(p: Point) {
        this._attachment = p.clone().sub(this.center);
    }

    public detach() {
        this._attachment = null;
    }

    get center(): Point
    {
        return this._center;
    }

    get sides(): number
    {
        return this._sides;
    }

    get sideLength(): number
    {
        return this._sideLength;
    }

    get radius(): number
    {
        return this._radius;
    }

    get apothem(): number
    {
        return this._apothem;
    }

    get interiorAngle(): Angle
    {
        return this._interiorAngle;
    }

    get centerAngle(): Angle
    {
        return this._centerAngle;
    }

    get vertices(): Point[]
    {
        return this._vertices;
    }

    get edges(): Line[]
    {
        return this._edges;
    }

    get normals(): Line[]
    {
        return this._normals;
    }

    set center(value: Point)
    {
        if (this._attachment === null) {
            this._center = value;
        } else {
            this._center = value.sub(this._attachment);
        }

        this.generateGeometries();
    }

    get colliding(): boolean
    {
        return this._colliding;
    }

    set colliding(value: boolean)
    {
        this._colliding = value;
    }
}