import {Config} from '../config';
import {Polygon} from '../geometry/polygon';
import {Point} from '../geometry/point';
import {Line} from '../geometry/line';

export class Context
{
    private canvas;
    private ctx;
    private config;

    constructor(config: Config)
    {
        this.canvas = document.getElementById(config.canvas.id);
        this.canvas.width = config.canvas.width;
        this.canvas.height = config.canvas.height;
        this.ctx    = this.canvas.getContext(config.context.type);
        this.ctx.width = this.canvas.width;
        this.ctx.height = this.canvas.height;
        this.config = config.context;
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    }

    /**
     * Draws the polygons, as well as axis+projections if
     * @param polys
     */
    drawPolygons(polys: Polygon[])
    {
        let normalAxis = [];
        let projections = [];
        // Generate unique normals and projections if showing
        if (this.config.polygon.showNormals) {
            // Sets up the unique axis.
            polys.map(polygon => {
                polygon.normals.map(normal => {
                    if (this.checkNormalsForParallel(normal, normalAxis)) {
                        let center = new Point(this.ctx.width / 2, this.ctx.height / 2);
                        let pos = normal.end.clone().sub(normal.start).unit();
                        let neg = pos.clone().mult(-1);
                        let max = Math.max(this.ctx.width, this.ctx.height);
                        pos.mult(max);
                        neg.mult(max);
                        pos.add(center);
                        neg.add(center);

                        normalAxis.push(new Line(neg, pos));
                    }
                });
            });

            // Projection generation
            polys.map(polygon => {
                normalAxis.map(axis => {
                    let dots = [];
                    polygon.vertices.map(
                        vertex => {
                            dots.push(vertex.projectedOnto(axis));
                        }
                    );

                    let min = Number.POSITIVE_INFINITY;
                    let minDot = null;
                    let max = Number.NEGATIVE_INFINITY;
                    let maxDot = null;
                    dots.map(dot => {
                        let dist = dot.dist(new Point(this.ctx.width / 2, this.ctx.height / 2));
                        if (dist < min) {
                            minDot = dot;
                            min = dist
                        }
                        if (dist > max) {
                            maxDot = dot;
                            max = dist;
                        }
                    });
                    projections.push(new Line(minDot, maxDot));
                });
            });
        }

        // Draw any axis and projections which were generated
        normalAxis.map(axis => this.drawAxis(axis));
        projections.map((proj, index) => this.drawProjection(proj, this.doesLineSegmentOverlap(proj, projections.filter((p, i) => i !== index))));

        // Draw each polygon
        polys.map(p => {
            this.ctx.beginPath();
            this.ctx.lineJoin = 'round';

            switch (this.config.polygon.fillOrStroke) {
                case 'stroke':
                    this.ctx.strokeStyle = this.config.polygon.color;
                    break;
                case 'fill':
                    this.ctx.fillStyle = this.config.polygon.color;
                    break;
                default:
            }
            this.ctx.lineWidth = this.config.polygon.lineWidth;

            p.edges.map(
                edge => {
                    this.ctx.moveTo(edge.start.x, edge.start.y);
                    this.ctx.lineTo(edge.end.x, edge.end.y);
                }
            );

            switch (this.config.polygon.fillOrStroke) {
                case 'stroke':
                    this.ctx.stroke();
                    break;
                case 'fill':
                    this.ctx.fill();
                    break;
                default:
            }
            this.ctx.closePath();
        });
    }

    drawAxis(axis: Line) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth;
        this.ctx.strokeStyle = this.config.polygon.color;
        this.ctx.moveTo(axis.start.x, axis.start.y);
        this.ctx.lineTo(axis.end.x, axis.end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawProjection(projection: Line, overlapping: boolean = false)
    {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth * 3;
        this.ctx.strokeStyle = overlapping ? 'red' : 'blue';
        this.ctx.moveTo(projection.start.x, projection.start.y);
        this.ctx.lineTo(projection.end.x, projection.end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    checkNormalsForParallel(needle, haystack): boolean
    {
        let found = true;
        haystack.map(line => {
            let vector = line.end.clone().sub(line.start);
            if (Math.abs(vector.unit().dot(needle.end.clone().sub(needle.start).unit())) == 1) { // 0 = perpendicular +/- 1 = parallel
                found = false;
            }
        });

        return found;
    }

    doesLineSegmentOverlap(needle, haystack): boolean
    {
        let overlap = false;
        haystack.map(line => {
            let vector = line.end.clone().sub(line.start);
            console.log(
                vector,
                needle,
                vector.dot(needle.end.clone().sub(needle.start)),
                Math.abs(vector.unit().dot(needle.end.clone().sub(needle.start).unit())),
                Math.abs(vector.dot(needle.end.clone().sub(needle.start))) == 1, needle.overlaps(line)
            );
            if (Math.abs(vector.unit().dot(needle.end.clone().sub(needle.start).unit())) == 1 && needle.overlaps(line)) {
                overlap = true;
            }
        });

        return overlap;
    }
}