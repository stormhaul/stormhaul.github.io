import {Config} from './config';
import {Context} from './rendering/context';
import {Polygon} from './geometry/polygon';
import {Point} from './geometry/point';

/**
 * @todo when shape overlaps origin, projections only spread over the side of the normals "more" encapsulated instead of whole thing.
 *     this issue also causes some erroneous collision detection. I wonder if it has to do with my normals being split from middle
 * @todo multi shape attachment messes with one of the shapes.
 */
export class App
{
    private config: Config;
    private context: Context;
    private polys: Polygon[];

    private _mouseDown = false;
    private mousePos = null;
    private attached = [];

    constructor()
    {
        let config = new Config();
        let context = new Context(config);
        let poly = new Polygon(new Point(0, 0), Math.floor(Math.random() * 9) + 3, 100);
        let poly2 = new Polygon(new Point(0, 0), Math.floor(Math.random() * 9) + 3, 100);
        let poly3 = new Polygon(new Point(0, 0), Math.floor(Math.random() * 9) + 3, 100);

        let polys = [poly, poly2, poly3];

        this.config = config;
        this.context = context;
        this.polys = polys;

        polys.map(poly => this.moveRandomly(poly));

        // context.drawPolygons(polys);
        document.addEventListener('mousedown', this.mouseDown.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
        document.addEventListener('mousemove', this.mouseMove.bind(this));

        this.loop();
    }

    mouseMove(e: MouseEvent)
    {
        console.log('move', e);
        this.mousePos = new Point(e.x, e.y);
        if (this.mousePos != null) {
            this.attached.map(attachment => {
                attachment.center = this.mousePos;
            });
        }
    }

    mouseDown(e: MouseEvent)
    {
        console.log(e);
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
        console.log(e);
        this._mouseDown = false;
        this.attached.map(attachment => {
            attachment.detach();
        });
        this.attached = [];
    }

    loop()
    {
        this.context.clear();
        this.context.drawBackgroundGrid();
        this.context.drawPolygons(this.polys);

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