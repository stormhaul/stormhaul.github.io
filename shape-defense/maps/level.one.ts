import {GameMap} from './game.map';
import {Grid} from '../helpers/grid';
import {Path} from './path';
import {Point} from '../helpers/point';
import {AStar} from '../helpers/a.star';
import {Tower} from '../towers/tower';
import {SquareTower} from '../towers/square.tower';
import {TriangleMonster} from '../monsters/triangle.monster';
import {Wave} from '../monsters/wave';
import {Timer} from '../monsters/timer';

export class LevelOne extends GameMap
{
    /**
     * @param width in px of the canvas section we can draw to
     * @param height in px of the canvas section we can draw to
     */
    constructor(width: number, height: number)
    {
        let cols      = 10;
        let rows      = 10;
        let cellWidth = Math.floor(Math.min((width - 10) / cols, (height - 10) / rows));
        super(width, height, cellWidth, cols, rows);

        this.towers = [];
        this.grid   = new Grid(cols, rows);

        this.setupTestMaze(cols, rows, cellWidth);
        // this.setUpRandomMaze(cols, rows, cellWidth);

        let path = this.waypoints.getFullPath(this.grid).map(item => this.convertGridToPixel(item));
        path.map(item => this.convertGridToPixel(item));

        let mons = [];
        for (let i = 0; i < 10; i++) {
            mons.push(
                new TriangleMonster(
                    this.convertGridToPixel(
                        this.waypoints
                            .getRoot()
                    ),
                    path
                )
            );
        }
        let wave = new Wave(mons);

        this.waveTimer = new Timer(0, 1, 10, this.spawnEnemy.bind(this));

        this.waves      = [wave];
        this.activeWave = 0;

        this.loop();
    }

    public setup(): this
    {
        // this.start();
        // setTimeout(() => {this.stop()}, 10000);
        return this;
    }

    private setupTestMaze(cols, rows, cellWidth): void
    {
        for (let i = 0; i < 9; i++) {
            let point = new Point(1, i);
            // the hardcoded offsets are not a solution, and merely have been used to prevent progress from halting.
            // @todo fix the error in calculation of converting grid to pixel.
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 2; i < 9; i++) {
            let point = new Point(i, 8);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 1; i < 8; i++) {
            let point = new Point(8, i);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 0; i < 7; i++) {
            let point = new Point(6, i);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 3; i < 6; i++) {
            let point = new Point(i, 6);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 2; i < 5; i++) {
            let point = new Point(i, 4);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 3; i < 6; i++) {
            let point = new Point(i, 2);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        for (let i = 3; i < 6; i++) {
            let point = new Point(i, 1);
            this.towers.push(new SquareTower(this.cellWidth - 6, this.convertGridToPixel(point).add(new Point(3, 7))));
            this.grid.set(point, this.towers[i]);
        }

        this.waypoints = new Path(
            [
                new Point(0, 0),
                new Point(5, 0),
                new Point(0, 5),
                new Point(9, 9)
            ]
        );
    }

    private setUpRandomMaze(cols, rows, cellWidth): void
    {
        let contains = (arr, item) =>
        {
            let found = false;
            arr.map(
                (i) =>
                {
                    if (i.dist(item) <= 2) {
                        found = true;
                    }
                }
            );

            return found;
        };

        let points = [];
        while (points.length < 10) {
            let x = Math.floor(Math.random() * cols);
            let y = Math.floor(Math.random() * rows);

            let p = new Point(x, y);

            if (!contains(points, p)) {
                points.push(p);
            }
        }

        this.waypoints = new Path(points);
    }

    public start(): this
    {
        // calls deltatime to reset time in case we paused
        this.deltaTime();
        this.playing = true;
        console.log(this.monsters);

        return this;
    }

    public stop(): this
    {
        this.playing = false;
        console.log(this.monsters);

        return this;
    }

    public loop(): this
    {
        if (this.playing) {
            this.deltaTime();
            this.waveTimer.tick();
            this.progressMonsters();
            this.progressTowers();
        }

        setTimeout(this.loop.bind(this), 50);
        return this;
    }

    private checkPath(): boolean
    {
        let cur = this.waypoints.getRoot();
        while (cur != null) {
            let next = this.waypoints.getNext(cur);
            if (next === null) {
                cur = null;
                continue;
            }
            console.log(AStar(this.grid, cur, next));
            if (null === AStar(this.grid, cur, next)) {
                return false;
            }
            cur = next;
        }

        return true;
    }

    private addTower(tower: Tower, point: Point): this
    {
        this.grid.set(point, tower);

        // Check that path isn't blocked.
        if (!this.checkPath()) {
            // path blocked so undo.
            this.removeTower(point);
        }

        return this;
    }

    private removeTower(point: Point): this
    {
        this.grid.unset(point);

        return this;
    }
}