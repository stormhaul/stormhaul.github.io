define(["require", "exports", "./line", "./projection"], function (require, exports, line_1, projection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Normal {
        constructor(line) {
            this._line = line;
            this._unitVector = line.end.clone().sub(line.start).unit();
            this._projections = [];
        }
        resetProjections() {
            this._projections = [];
            return this;
        }
        projectPolygon(p) {
            let dots = [];
            p.vertices.map(vertex => {
                dots.push(vertex.projectedOnto(this._line));
            });
            let min = Number.POSITIVE_INFINITY;
            let minDot = null;
            let max = Number.NEGATIVE_INFINITY;
            let maxDot = null;
            dots.map(dot => {
                let dist = dot.dist(this._line.midpoint);
                if (dist < min) {
                    minDot = dot;
                    min = dist;
                }
                if (dist > max) {
                    maxDot = dot;
                    max = dist;
                }
            });
            this._projections.push(new projection_1.Projection(new line_1.Line(minDot, maxDot)));
            this._projections.map((projection, index) => {
                this._projections.map((proj, i) => {
                    if (i === index) {
                        return;
                    }
                    if (projection.overlaps(proj)) {
                        projection.isIntersecting = true;
                        proj.isIntersecting = true;
                    }
                });
            });
            return this;
        }
        get line() {
            return this._line;
        }
        get projections() {
            return this._projections;
        }
    }
    exports.Normal = Normal;
});
