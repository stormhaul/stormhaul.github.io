import {Config} from './config';
import {Context} from './rendering/context';
import {Polygon} from './geometry/polygon';
import {Point} from './geometry/point';

export class App
{
    private context: Context;
    private polys: Polygon[];

    constructor()
    {
        let config = new Config();
        let context = new Context(config);
        let poly = new Polygon(new Point(450, 250), 5, 100);
        let poly2 = new Polygon(new Point(1000, 400), 4, 100);
        let poly3 = new Polygon(new Point(450, 300), 3, 100);

        let polys = [poly, poly2, poly3];

        // context.drawPolygons(polys);

        this.context = context;
        this.polys = polys;

        this.loop();
    }

    loop()
    {
        this.context.clear();
        this.context.drawPolygons(this.polys);

        // requestAnimationFrame(this.loop.bind(this));
    }
}