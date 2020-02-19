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

        this.generateGeometries();
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
}