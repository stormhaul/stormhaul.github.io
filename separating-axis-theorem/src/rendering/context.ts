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
    private offset: Point = new Point(0, 0);

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
        this.ctx.fillStyle = 'black';
        this.ctx.rect(0,0,this.ctx.width, this.ctx.height);
        this.ctx.fill();
    }

    setCenter(offset: Point)
    {
        this.offset = offset;
        this.ctx.translate(offset.x, offset.y);
    }

    resetCenter()
    {
        this.ctx.translate(this.offset.x * -1, this.offset.y * -1);
    }

    drawBackgroundGrid()
    {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, .1)';

        for (let i = 0; i < this.ctx.width; i+=10) {
            this.line(
                new Point(i, 0),
                new Point(i, this.ctx.height)
            );
        }
        for (let i = 0; i < this.ctx.height; i+=10) {
            this.line(
                new Point(0, i),
                new Point(this.ctx.width, i)
            );
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
                    this.ctx.strokeStyle = p.colliding ? 'red' : this.config.polygon.color;
                    break;
                case 'fill':
                    this.ctx.fillStyle = this.config.polygon.color;
                    break;
                default:
            }
            this.ctx.lineWidth = this.config.polygon.lineWidth;

            p.edges.map(
                edge => {
                    this.line(edge.start, edge.end);
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

        if (this.config.polygon.showProjections) {
            normals.map(normal => {
                normal.projections.map(proj => {
                    this.drawProjection(proj.line, proj.color);
                });
            });
        }

        if (this.config.polygon.showProjectionGuides) {
            normals.map(normal => {
                normal.guides.map(guide => {
                    this.drawGuide(guide);
                });
            });
        }
    }

    drawGuide(guide: Line) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth;
        this.ctx.strokeStyle = 'white';
        this.ctx.setLineDash([5]);
        this.line(guide.start, guide.end);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.setLineDash([]);
    }

    drawAxis(axis: Line) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth;
        this.ctx.strokeStyle = this.config.polygon.color;
        this.line(axis.start, axis.end);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawProjection(projection: Line, color: string)
    {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.config.polygon.lineWidth * 3;
        this.ctx.strokeStyle = color;
        this.line(projection.start, projection.end);
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

    private line(start: Point, end: Point)
    {
        let ns = this.offset.clone().add(start),
            ne = this.offset.clone().add(end);
        this.ctx.moveTo(ns.x, ns.y);
        this.ctx.lineTo(ne.x, ne.y);
    }
}