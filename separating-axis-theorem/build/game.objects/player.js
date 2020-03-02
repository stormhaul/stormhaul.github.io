define(["require", "exports", "./object.parent", "../geometry/point", "../geometry/polygon"], function (require, exports, object_parent_1, point_1, polygon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player extends object_parent_1.ObjectParent {
        constructor(position) {
            super();
            this._affectedByGravity = true;
            this._immobile = false;
            this._clippable = true;
            this._position = position;
            this._velocity = new point_1.Point(0, 0);
            this._acceleration = new point_1.Point(0, 0);
            this._mass = 100;
            this._generatePolygons();
        }
        render(context) {
            context.drawPolygons(this._polygons);
        }
        _generatePolygons() {
            let sl = 10;
            let head = new polygon_1.Polygon(this._position.clone(), 3, sl);
            let leg1 = new polygon_1.Polygon(this._position.clone().add(new point_1.Point(-sl * 2, 0)), 4, sl);
            let leg2 = new polygon_1.Polygon(this._position.clone().add(new point_1.Point(sl * 2, 0)), 4, sl);
            let leg3 = new polygon_1.Polygon(this._position.clone().add(new point_1.Point(0, -sl * 2)), 4, sl);
            let leg4 = new polygon_1.Polygon(this._position.clone().add(new point_1.Point(0, sl * 2)), 4, sl);
            this._polygons = [
                head,
                leg1,
                leg2,
                leg3,
                leg4
            ];
        }
        applyForce(force) {
            this._acceleration.add(force.vector.clone().mult(force.vector.mag() / this._mass));
        }
        accelerate() {
            this._velocity.add(this._acceleration).mult(.9);
        }
        move() {
            this._position.add(this._velocity);
            this._polygons.map(poly => {
                poly.center = poly.center.clone().add(this._velocity);
            });
        }
        get position() {
            return this._position;
        }
        set position(value) {
            this._position = value;
        }
        get polygons() {
            return this._polygons;
        }
        get velocity() {
            return this._velocity;
        }
        set velocity(value) {
            this._velocity = value;
        }
        get acceleration() {
            return this._acceleration;
        }
        set acceleration(value) {
            this._acceleration = value;
        }
        get affectedByGravity() {
            return this._affectedByGravity;
        }
        get immobile() {
            return this._immobile;
        }
        get clippable() {
            return this._clippable;
        }
        get mass() {
            return this._mass;
        }
    }
    exports.Player = Player;
});