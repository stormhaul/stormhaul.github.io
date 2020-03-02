import {Config} from './config';
import {Context} from './rendering/context';
import {Polygon} from './geometry/polygon';
import {Point} from './geometry/point';
import {Player} from './game.objects/player';
import {RenderRangeController} from './controllers/render.range.controller';
import {Obstacle} from './game.objects/obstacle';
import {PhysicsController} from './controllers/physics.controller';

/**
 * @todo multi shape attachment messes with one of the shapes.
 * @todo set up structure either to use multiple normal/projection setups or in some other way scalable
 *     to allow for true collision detection rather than these guides.
 * @todo hexagons aren't drawn at the correct angle. No idea why.
 * @todo occasionally clicking on a shape will cause it to delete
 */
export class App
{
    private config: Config;
    private context: Context;
    private polys: Polygon[];
    private player: Player;
    private platforms: Obstacle[];
    private renderRangeController: RenderRangeController;
    private physicsController: PhysicsController;

    private _mouseDown = false;
    private mousePos = null;
    private attached = [];

    constructor()
    {
        let config = new Config();
        let context = new Context(config);
        let poly = new Polygon(new Point(0, 0), 4, 100);// Math.floor(Math.random() * 5) + 3, 100);
        let poly2 = new Polygon(new Point(0, 0), 3, 100);// Math.floor(Math.random() * 5) + 3, 100);
        let poly3 = new Polygon(new Point(0, 0), Math.floor(Math.random() * 5) + 3, 100);

        //let polys = [poly, poly2];
        let polys = [
            // new Polygon(new Point(0, 0), 6, 100),
            // new Polygon(new Point(0, 0), 6, 100),
            // new Polygon(new Point(0, 0), 6, 100),
            // new Polygon(new Point(0, 0), 3, 100),
            // new Polygon(new Point(0, 0), 3, 100),
            // new Polygon(new Point(0, 0), 3, 100),
            // new Polygon(new Point(0, 0), 3, 100),
            // new Polygon(new Point(0, 0), 3, 100),
            // new Polygon(new Point(0, 0), 3, 100)
        ];

        this.config = config;
        this.context = context;
        this.polys = polys;

        polys.map(poly => this.moveRandomly(poly));
        this.physicsController = new PhysicsController();

        this.player = new Player(new Point(100, 100));
        this.renderRangeController = new RenderRangeController(this.player, this.config);
        this.context.setCenter(this.player.position);
        // this.player.render(context);

        this.platforms = [];
        this.platforms.push(new Obstacle(new Point(100, 200), [new Polygon(new Point(100, 200), 4, 100)]));
        // this.platforms.map(platform => {
        //     platform.render(context);
        // });

        this.physicsController.register(this.player);

        // context.drawPolygons(polys);
        document.addEventListener('mousedown', this.mouseDown.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
        document.addEventListener('mousemove', this.mouseMove.bind(this));

        this.checkCollisions();
        this.loop();
    }

    checkCollisions()
    {
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

    mouseMove(e: MouseEvent)
    {
        this.mousePos = new Point(e.x, e.y);
        if (this.mousePos != null) {
            this.attached.map(attachment => {
                attachment.center = this.mousePos;
            });
            if (this.attached.length > 0) {
                this.checkCollisions();
            }
        }
    }

    mouseDown(e: MouseEvent)
    {
        this._mouseDown = true;
        this.polys.map(poly => {
            let point = new Point(e.x, e.y);
            if (this.attached.indexOf(poly) === -1 && poly.isBounding(point)) {
                poly.attach(point);
                this.attached.push(poly);
            }
        });
    }

    mouseUp(e: MouseEvent)
    {
        this._mouseDown = false;
        this.attached.map(attachment => {
            attachment.detach();
        });
        this.attached = [];
    }

    loop()
    {
        this.physicsController.tick();

        this.context.clear();
        this.context.resetCenter();

        this.context.drawBackgroundGrid();
        this.context.drawPolygons(this.polys);
        this.player.render(this.context);
        this.platforms.map(platform => {
            platform.render(this.context);
        });
        this.context.setCenter(this.player.position);

        requestAnimationFrame(this.loop.bind(this));
    }

    moveRandomly(p: Polygon)
    {
        p.center = new Point(
            Math.floor(Math.random() * (this.config.canvas.width - 4 * p.radius) + 2 * p.radius),
            Math.floor(Math.random() * (this.config.canvas.height - 4 * p.radius) + 2 * p.radius)
        );
    }
}