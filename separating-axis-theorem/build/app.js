define(["require", "exports", "./config", "./rendering/context", "./geometry/polygon", "./geometry/point", "./game.objects/player", "./controllers/render.range.controller", "./game.objects/obstacle"], function (require, exports, config_1, context_1, polygon_1, point_1, player_1, render_range_controller_1, obstacle_1) {
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
            let polys = [];
            this.config = config;
            this.context = context;
            this.polys = polys;
            polys.map(poly => this.moveRandomly(poly));
            this.player = new player_1.Player(new point_1.Point(100, 100));
            this.renderRangeController = new render_range_controller_1.RenderRangeController(this.player, this.config);
            this.player.render(context);
            this.platforms = [];
            this.platforms.push(new obstacle_1.Obstacle(new point_1.Point(100, 200), [new polygon_1.Polygon(new point_1.Point(100, 200), 4, 100)]));
            this.platforms.map(platform => {
                platform.render(context);
            });
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
            this.player.render(this.context);
            this.platforms.map(platform => {
                platform.render(this.context);
            });
            requestAnimationFrame(this.loop.bind(this));
        }
        moveRandomly(p) {
            p.center = new point_1.Point(Math.floor(Math.random() * (this.config.canvas.width - 4 * p.radius) + 2 * p.radius), Math.floor(Math.random() * (this.config.canvas.height - 4 * p.radius) + 2 * p.radius));
        }
    }
    exports.App = App;
});
