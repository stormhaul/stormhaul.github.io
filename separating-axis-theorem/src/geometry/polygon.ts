import {Point} from './point';
import {Angle} from './angle';
import {Line} from './line';
import {RadialLine} from './radial.line';

export class Polygon
{
    private _center: Point;
    private _sides: number;
    private _sideLength: number;
    private _radius: number; // length from center to vertex
    private _apothem: number; // length from center to midpoint of edges
    private _interiorAngle: Angle; // Angle Between V1 V2 V3
    private _centerAngle: Angle; // Angle Between V1 C V2
    private _vertices: Point[];
    private _edges: Line[];
    private _normals: Line[]; // normal for each edge
    private _orientation: Angle; // Initial angle used when generating the vertices 0 is → 90 is ↓
    private _attachment: Point|null;

    constructor(center: Point, sides: number, sideLength: number)
    {
        this._center     = center;
        this._sides      = sides;
        this._sideLength = sideLength;
        this._orientation = new Angle(Math.floor(Math.random() * 360));//sides % 2 === 1 ? -90 : -45);

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

    private generateGeometries()
    {
        this._vertices = this.generateVertices();
        this._edges = this.generateEdges();
        this._normals = this.generateNormals();
    }

    private generateVertices(): Point[]
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

    private generateEdges(): Line[]
    {
        let edges = [];

        this._vertices.map(
            (vertex, index) => {
                edges.push(new Line(vertex, this._vertices[(index + 1) % this._vertices.length]));
            }
        );

        return edges;
    }

    private generateNormals(): Line[]
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
        console.log('hello setter');
        if (this._attachment === null) {
            console.log('attachment null');
            this._center = value;
        } else {
            console.log('attached');
            this._center = value.sub(this._attachment);
        }

        this.generateGeometries();
    }
}