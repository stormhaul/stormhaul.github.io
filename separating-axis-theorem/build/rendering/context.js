define(["require", "exports", "../geometry/point", "../geometry/line", "../geometry/normal"], function (require, exports, point_1, line_1, normal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Context {
        constructor(config) {
            this.canvas = document.getElementById(config.canvas.id);
            this.canvas.width = config.canvas.width;
            this.canvas.height = config.canvas.height;
            this.ctx = this.canvas.getContext(config.context.type);
            this.ctx.width = this.canvas.width;
            this.ctx.height = this.canvas.height;
            this.config = config.context;
        }
        clear() {
            this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
            this.ctx.fillStyle = 'black';
            this.ctx.rect(0, 0, this.ctx.width, this.ctx.height);
            this.ctx.fill();
        }
        setCenter(offset) {
            this.ctx.translate(offset.x, offset.y);
        }
        resetCenter(offset) {
            this.ctx.translate(-offset.x, offset.y);
        }
        drawBackgroundGrid() {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
            for (let i = 0; i < this.ctx.width; i += 10) {
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, this.ctx.height);
            }
            for (let i = 0; i < this.ctx.height; i += 10) {
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.ctx.width, i);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
        drawPolygons(polys) {
            let normalAxis = [];
            let normals = [];
            let projections = [];
            if (this.config.polygon.showNormals) {
                polys.map(polygon => {
                    polygon.normals.map(normal => {
                        if (this.checkNormalsForParallel(normal, normalAxis)) {
                            let center = new point_1.Point(this.ctx.width / 2, this.ctx.height / 2);
                            let pos = normal.end.clone().sub(normal.start).unit();
                            let neg = pos.clone().mult(-1);
                            let max = Math.max(this.ctx.width, this.ctx.height);
                            pos.mult(max);
                            neg.mult(max);
                            pos.add(center);
                            neg.add(center);
                            normalAxis.push(new line_1.Line(neg, pos));
                        }
                    });
                });
                normals = normalAxis.map(axis => new normal_1.Normal(axis));
                polys.map(shape => { normals.map(normal => normal.projectPolygon(shape)); });
            }
            this.drawNormals(normals);
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
                p.edges.map(edge => {
                    this.ctx.moveTo(edge.start.x, edge.start.y);
                    this.ctx.lineTo(edge.end.x, edge.end.y);
                });
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
        drawNormals(normals) {
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
        drawGuide(guide) {
            this.ctx.beginPath();
            this.ctx.lineWidth = this.config.polygon.lineWidth;
            this.ctx.strokeStyle = 'white';
            this.ctx.setLineDash([5]);
            this.ctx.moveTo(guide.start.x, guide.start.y);
            this.ctx.lineTo(guide.end.x, guide.end.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.setLineDash([]);
        }
        drawAxis(axis) {
            this.ctx.beginPath();
            this.ctx.lineWidth = this.config.polygon.lineWidth;
            this.ctx.strokeStyle = this.config.polygon.color;
            this.ctx.moveTo(axis.start.x, axis.start.y);
            this.ctx.lineTo(axis.end.x, axis.end.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        drawProjection(projection, color) {
            this.ctx.beginPath();
            this.ctx.lineWidth = this.config.polygon.lineWidth * 3;
            this.ctx.strokeStyle = color;
            this.ctx.moveTo(projection.start.x, projection.start.y);
            this.ctx.lineTo(projection.end.x, projection.end.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        checkNormalsForParallel(needle, haystack) {
            let found = true;
            haystack.map(line => {
                let vector = line.end.clone().sub(line.start);
                if (Math.abs(vector.unit().dot(needle.end.clone().sub(needle.start).unit())) == 1) {
                    found = false;
                }
            });
            return found;
        }
        doesLineSegmentOverlap(needle, haystack) {
            let overlap = false;
            haystack.map(line => {
                let vector = line.end.clone().sub(line.start).unit();
                console.log(vector, needle, vector.dot(needle.end.clone().sub(needle.start).unit()), Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())), Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())) == 1, needle.overlaps(line));
                if (Math.abs(vector.dot(needle.end.clone().sub(needle.start).unit())) == 1 && needle.overlaps(line)) {
                    overlap = true;
                }
            });
            return overlap;
        }
    }
    exports.Context = Context;
});
