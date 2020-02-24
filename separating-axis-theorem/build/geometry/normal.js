define(["require", "exports", "./line", "./projection"], function (require, exports, line_1, projection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Normal {
        constructor(line) {
            this._line = line;
            this._unitVector = line.end.clone().sub(line.start).unit();
            this._projections = [];
            this._guides = [];
        }
        resetProjections() {
            this._projections = [];
            this._guides = [];
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
            let v1 = null;
            let v2 = null;
            dots.map((dot, index) => {
                dots.map((d2, i) => {
                    let dist = dot.dist(d2);
                    if (dist > maxDist) {
                        s = dot;
                        e = d2;
                        v1 = p.vertices[index];
                        v2 = p.vertices[i];
                        maxDist = dist;
                    }
                });
            });
            this._projections.push(new projection_1.Projection(new line_1.Line(s, e)));
            this._guides.push(new line_1.Line(s, v1));
            this._guides.push(new line_1.Line(e, v2));
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
        hasCollision() {
            let colliding = false;
            this._projections.map((projection, index) => {
                this._projections.map((proj, i) => {
                    if (i === index) {
                        return;
                    }
                    if (proj.overlaps(projection)) {
                        colliding = true;
                    }
                });
            });
            return colliding;
        }
        get line() {
            return this._line;
        }
        get projections() {
            return this._projections;
        }
        get guides() {
            return this._guides;
        }
    }
    exports.Normal = Normal;
});
