define(["require", "exports", "./config", "./rendering/context", "./geometry/polygon", "./geometry/point"], function (require, exports, config_1, context_1, polygon_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            this._mouseDown = false;
            this.mousePos = null;
            this.attached = [];
            let config = new config_1.Config();
            let context = new context_1.Context(config);
            let poly = new polygon_1.Polygon(new point_1.Point(0, 0), 4, 100);
            let poly2 = new polygon_1.Polygon(new point_1.Point(0, 0), 3, 100);
            let poly3 = new polygon_1.Polygon(new point_1.Point(0, 0), Math.floor(Math.random() * 5) + 3, 100);
            let polys = [
                new polygon_1.Polygon(new point_1.Point(0, 0), 4, 100),
                new polygon_1.Polygon(new point_1.Point(0, 0), 4, 100),
            ];
            this.config = config;
            this.context = context;
            this.polys = polys;
            polys.map(poly => this.moveRandomly(poly));
            document.addEventListener('mousedown', this.mouseDown.bind(this));
            document.addEventListener('mouseup', this.mouseUp.bind(this));
            document.addEventListener('mousemove', this.mouseMove.bind(this));
            this.checkCollisions();
            this.loop();
        }
        checkCollisions() {
            this.polys.map((poly, index) => {
                let colliding = false;
                this.polys.map((p, i) => {
                    if (i === index) {
                        return;
                    }
                    if (poly.isColliding(p)) {
                        colliding = true;
                    }
                });
                poly.colliding = colliding;
            });
        }
        mouseMove(e) {
            this.mousePos = new point_1.Point(e.x, e.y);
            if (this.mousePos != null) {
                this.attached.map(attachment => {
                    attachment.center = this.mousePos;
                });
                if (this.attached.length > 0) {
                    this.checkCollisions();
                }
            }
        }
        mouseDown(e) {
            this._mouseDown = true;
            this.polys.map(poly => {
                let point = new point_1.Point(e.x, e.y);
                if (this.attached.indexOf(poly) === -1 && poly.isBounding(point)) {
                    poly.attach(point);
                    this.attached.push(poly);
                }
            });
        }
        mouseUp(e) {
            this._mouseDown = false;
            this.attached.map(attachment => {
                attachment.detach();
            });
            this.attached = [];
        }
        loop() {
            this.context.clear();
            this.context.drawBackgroundGrid();
            this.context.drawPolygons(this.polys);
            requestAnimationFrame(this.loop.bind(this));
        }
        moveRandomly(p) {
            p.center = new point_1.Point(Math.floor(Math.random() * (this.config.canvas.width - 4 * p.radius) + 2 * p.radius), Math.floor(Math.random() * (this.config.canvas.height - 4 * p.radius) + 2 * p.radius));
        }
    }
    exports.App = App;
});
