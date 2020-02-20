define(["require", "exports", "./angle", "./line", "./radial.line"], function (require, exports, angle_1, line_1, radial_line_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Polygon {
        constructor(center, sides, sideLength) {
            this._center = center;
            this._sides = sides;
            this._sideLength = sideLength;
            this._orientation = new angle_1.Angle(Math.floor(Math.random() * 360));
            this._centerAngle = new angle_1.Angle(360 / this._sides);
            this._interiorAngle = new angle_1.Angle(180 * (this._sides - 2));
            this._radius = this._sideLength / (2 * Math.sin(Math.PI / this._sides));
            this._apothem = this._radius * Math.cos(Math.PI / this._sides);
            this._attachment = null;
            this.generateGeometries();
        }
        isBounding(p) {
            let inside = false;
            this._vertices.map((vertex, index) => {
                if (index + 1 === this._vertices.length) {
                    return;
                }
                let x1 = vertex.x, y1 = vertex.y, x2 = this._vertices[index + 1].x, y2 = this._vertices[index + 1].y;
                let intersect = ((y1 > p.y) != (y2 > p.y))
                    && (p.x < (x2 - x1) * (p.y - y1) / (y2 - y1) + x1);
                if (intersect) {
                    inside = !inside;
                }
            });
            return inside;
        }
        generateGeometries() {
            this._vertices = this.generateVertices();
            this._edges = this.generateEdges();
            this._normals = this.generateNormals();
        }
        generateVertices() {
            let vertices = [];
            let angle = this._orientation.clone();
            do {
                let radialLine = new radial_line_1.RadialLine(this._center, angle, this._radius);
                vertices.push(radialLine.end);
                angle.add(this._centerAngle);
            } while (vertices.length < this.sides);
            return vertices;
        }
        generateEdges() {
            let edges = [];
            this._vertices.map((vertex, index) => {
                edges.push(new line_1.Line(vertex, this._vertices[(index + 1) % this._vertices.length]));
            });
            return edges;
        }
        generateNormals() {
            let normals = [];
            this._edges.map(edge => {
                normals.push(edge.getNormal());
            });
            return normals;
        }
        attach(p) {
            this._attachment = p.clone().sub(this.center);
        }
        detach() {
            this._attachment = null;
        }
        get center() {
            return this._center;
        }
        get sides() {
            return this._sides;
        }
        get sideLength() {
            return this._sideLength;
        }
        get radius() {
            return this._radius;
        }
        get apothem() {
            return this._apothem;
        }
        get interiorAngle() {
            return this._interiorAngle;
        }
        get centerAngle() {
            return this._centerAngle;
        }
        get vertices() {
            return this._vertices;
        }
        get edges() {
            return this._edges;
        }
        get normals() {
            return this._normals;
        }
        set center(value) {
            console.log('hello setter');
            if (this._attachment === null) {
                console.log('attachment null');
                this._center = value;
            }
            else {
                console.log('attached');
                this._center = value.sub(this._attachment);
            }
            this.generateGeometries();
        }
    }
    exports.Polygon = Polygon;
});
