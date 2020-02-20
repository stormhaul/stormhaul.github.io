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
            let maxDist = -1;
            let s = null;
            let e = null;
            dots.map(dot => {
                dots.map(d2 => {
                    let dist = dot.dist(d2);
                    if (dist > maxDist) {
                        s = dot;
                        e = d2;
                        maxDist = dist;
                    }
                });
            });
            this._projections.push(new projection_1.Projection(new line_1.Line(s, e)));
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
