import {Grid} from '../helpers/grid';
import {RenderableParent} from '../rendering/renderable.parent';
import {Path} from './path';
import {Point} from '../helpers/point';
import {Context} from '../rendering/context';
import {AStar} from '../helpers/a.star';
import {Tower} from '../towers/tower';
import {Monster} from '../monsters/monster';
import {Wave} from '../monsters/wave';
import {Timer} from '../monsters/timer';

export abstract class GameMap extends RenderableParent
{
    protected grid: Grid;
    protected time: number = Date.now();
    protected waypoints: Path;
    protected gridOrigin: Point;
    protected cellWidth: number;
    protected cols: number;
    protected rows: number;
    protected towers: Array<Tower>;
    protected monsters: Array<Monster>;
    protected waves: Array<Wave>;
    protected activeWave: number;
    protected waveTimer: Timer;
    protected playing: boolean;

    /**
     * Note, each grid index refers to the top left corner of the cell for the purposes of rendering.
     * @param width of pane in px
     * @param height of pane in px
     * @param cellWidth width of cell of grid
     * @param cols number of cols in grid
     * @param rows number of rows in grid
     */
    protected constructor(width: number, height: number, cellWidth: number, cols: number, rows: number)
    {
        super();

        this.gridOrigin = new Point(
            (width - (cellWidth * cols)) / 2,
            (height - (cellWidth * rows)) / 2
        );
        this.cellWidth  = cellWidth;
        this.cols       = cols;
        this.rows       = rows;
        this.monsters   = [];
        this.waves      = [];
        this.activeWave = 0;
        this.playing    = false;
    }

    // Runs any initialization needed to revert map to base state
    public abstract setup(): this;

    public abstract start(): this;

    public abstract stop(): this;

    public getGrid(): Grid
    {
        return this.grid;
    }

    /**
     * Updates internal time marker and returns the time that passed since last call.
     */
    public deltaTime(): number
    {
        let now   = Date.now();
        let dt    = now - this.time;
        this.time = now;

        return dt;
    }

    public render(context: Context, offset: Point): void
    {
        this.renderGrid(context, offset);
        this.renderTowers(context, offset);
        this.renderWaypoints(context, offset);
        this.renderMonsters(context, offset);
    }

    private renderGrid(context: Context, offset: Point): void
    {
        let sum = this.gridOrigin.add(this.getParentOffset());

        for (let i = 0; i <= this.cols; i++) {
            context.line(
                new Point(sum.x + i * this.cellWidth, sum.y),
                new Point(sum.x + i * this.cellWidth, sum.y + this.rows * this.cellWidth),
                1,
                'white'
            );
        }

        for (let i = 0; i <= this.cols; i++) {
            context.line(
                new Point(sum.x, sum.y + i * this.cellWidth),
                new Point(sum.x + this.rows * this.cellWidth, sum.y + i * this.cellWidth),
                1,
                'white'
            );
        }
    }

    private renderTowers(context: Context, offset: Point): void
    {
        this.towers.map(
            (tower) =>
            {
                tower.render(context, offset);
            }
        );
    }

    private renderWaypoints(context: Context, offset: Point): void
    {
        let colors = [
            'rgba(230, 25,  75,  .4)',
            'rgba(60,  180, 75,  .4)',
            'rgba(255, 225, 25,  .4)',
            'rgba(67,  99,  216, .4)',
            'rgba(245, 130, 49,  .4)',
            'rgba(145, 30,  180, .4)',
            'rgba(70,  240, 240, .4)',
            'rgba(240, 50,  230, .4)',
            'rgba(188, 246, 12,  .4)',
            'rgba(250, 190, 190, .4)',
            'rgba(0,   128, 128, .4)',
            'rgba(230, 190, 255, .4)',
            'rgba(154, 99,  36,  .4)',
            'rgba(255, 250, 200, .4)',
            'rgba(128, 0,   128, .4)',
            'rgba(170, 255, 195, .4)',
            'rgba(128, 128, 0,   .4)',
            'rgba(255, 216, 177, .4)',
            'rgba(0,   117, 117, .4)',
            'rgba(128, 128, 128, .4)'
        ];
        let sum    = this.gridOrigin.add(this.getParentOffset());

        let cur = this.waypoints.getRoot();
        let i = 0;
        while (cur) {
            context.circle(
                cur.mult(this.cellWidth).add(sum).add(new Point(this.cellWidth / 2, this.cellWidth / 2)),
                this.cellWidth / 3,
                0,
                true,
                colors[i % colors.length],
                false,
                ''
            );

            cur = this.waypoints.getNext(cur);
            i++;
        }

        let prev = null;
        cur      = this.waypoints.getRoot();
        let ct   = 0;
        while (cur) {
            if (prev != null) {
                let sel = colors[ct % colors.length];
                ct++;
                let path = AStar(this.grid, prev, cur);
                for (let i = 0; i < path.length - 1; i++) {
                    context.line(
                        path[i].mult(this.cellWidth).add(sum).add(new Point(this.cellWidth / 2, this.cellWidth / 2)),
                        path[i + 1].mult(this.cellWidth).add(sum).add(new Point(
                            this.cellWidth / 2,
                            this.cellWidth / 2
                        )),
                        1,
                        sel
                    );
                }
            }

            prev = cur;
            cur  = this.waypoints.getNext(cur);
        }
    }

    private renderMonsters(context: Context, offset: Point): void
    {
        this.monsters.map(
            monster =>
            {
                monster.render(context,
                               offset !== undefined
                               ? offset.add(new Point(this.cellWidth / 2, this.cellWidth / 2))
                               : new Point(this.cellWidth / 2, this.cellWidth / 2)
                );
            }
        );
    }

    protected convertGridToPixel(point: Point): Point
    {
        return point.add(new Point(0, 1)).mult(this.cellWidth).add(this.gridOrigin).add(this.getParentOffset());
    }

    protected spawnEnemy(): this
    {
        let wave = this.waves[this.activeWave];

        let spawn = wave != undefined ? wave.getNextSpawn() : null;
        while (null === spawn) {
            if (++this.activeWave >= this.waves.length) {
                return this;
            }

            wave  = this.waves[this.activeWave];
            spawn = wave.getNextSpawn();
        }
        this.monsters.push(spawn);

        return this;
    }

    protected progressMonsters(): this
    {
        this.monsters.map(monster => monster.move());
        return this;
    }

    protected progressTowers(): this
    {
        return this;
    }
}