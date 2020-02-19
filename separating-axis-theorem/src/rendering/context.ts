import {Config} from '../config';
import {Polygon} from '../geometry/polygon';
import {Point} from '../geometry/point';
import {Line} from '../geometry/line';
import {Normal} from '../geometry/normal';

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

    drawBackgroundGrid()
    {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, .1)';

        for (let i = 0; i < this.ctx.width; i+=10) {
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.ctx.height);
        }
        for (let i = 0; i < this.ctx.height; i+=10) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.ctx.width, i);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Draws the polygons, as well as axis+projections if
     * @param polys
     */
    drawPolygons(polys: Polygon[])
    {
        let normalAxis = [];
        let normals = [];
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

            normals = normalAxis.map(axis => new Normal(axis));


            // Projection generation
            polys.map(shape => {normals.map(normal => normal.projectPolygon(shape))});
        }

        // Draw any axis and projections which were generated
        this.drawNormals(normals);

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

    drawNormals(normals: Normal[])
    {
        normals.map(normal => {
            this.drawAxis(normal.line);
        });

        normals.map(normal => {
            normal.projections.map(proj => {
                this.drawProjection(proj.line, proj.color);
            });
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

    drawProjection(projection: Line, color: string)
    {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth * 3;
        this.ctx.strokeStyle = color;
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
            let vector = line.end.clone().sub(line.start).unit();
            console.log(
                vector,
                needle,
                vector.dot(needle.end.clone().sub(needle.start).unit()),
                Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())),
                Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())) == 1,
                needle.overlaps(line)
            );
            if (Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())) == 1 && needle.overlaps(line)) {
                overlap = true;
            }
        });

        return overlap;
    }
}