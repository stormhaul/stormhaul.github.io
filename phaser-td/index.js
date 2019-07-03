let phaser = require('phaser');

let graphics;
let path;
var ENEMY_SPEED = 1/10000;
var CELL_WIDTH = 32;
var BULLET_DAMAGE = 20;
var map = [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 512;
var MAP_WAYPOINTS = 2;
var SIDES = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
};

let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log('preload called');
    //load assets
    this.load.image('enemy', 'assets/enemy.png');
}

function create() {
    // this graphics element is only for visualization,
    // its not related to our path
    var graphics = this.add.graphics();
    drawGrid(graphics);

    // the path for our enemies
    // parameters are the start x and y of our path

    // top, right, bottom, left
    let enterSide = Math.floor(Math.random() * 4);
    let exitSide = Math.floor(Math.random() * 4);

    while (exitSide === enterSide) {
        exitSide = Math.floor(Math.random() * 4);
    }

    let rows = CANVAS_HEIGHT / CELL_WIDTH;
    let cols = CANVAS_WIDTH / CELL_WIDTH;

    let waypoints = [];
    let dict = {};

    while (waypoints.length < MAP_WAYPOINTS) {
        let x = Math.floor(Math.random() * cols);
        let y = Math.floor(Math.random() * rows);

        if (dict[x + ',' + y] === undefined) {
            dict[x + ',' + y] = true;
            waypoints.push([x, y]);
        }
    }

    generatePath(enterSide, exitSide, waypoints, rows, cols);

    console.log(enterSide, exitSide);

    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);

    graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    path.draw(graphics);

    enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true});
    this.nextEnemy = 0;

    turrets = this.add.group({classType: Turret, runChildUpdate: true});
    this.input.on('pointerdown', placeTurret);

    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    this.physics.add.overlap(enemies, bullets, damageEnemy);
}

function update(time, delta) {
    if (time > this.nextEnemy) {
        var enemy = enemies.get();
        if (enemy) {
            enemy.setActive(true);
            enemy.setVisible(true);

            // place the enemy at the start of the path
            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }
    }
}

function drawGrid(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 512 / CELL_WIDTH; i++) {
        graphics.moveTo(0, i * CELL_WIDTH);
        graphics.lineTo(640, i * CELL_WIDTH);
    }
    for(var j = 0; j < 640 / CELL_WIDTH; j++) {
        graphics.moveTo(j * CELL_WIDTH, 0);
        graphics.lineTo(j * CELL_WIDTH, 512);
    }
    graphics.strokePath();
}

function placeTurret(pointer) {
    var i = Math.floor(pointer.y/CELL_WIDTH);
    var j = Math.floor(pointer.x/CELL_WIDTH);
    if(canPlaceTurret(i, j)) {
        var turret = turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }
    }
}

function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
            return enemyUnits[i];
    }
    return false;
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}

function generatePath(enterSide, exitSide, waypoints, rows, cols) {
    let start = getEntryExitPoint(enterSide, rows, cols);
    let end   = getEntryExitPoint(exitSide,  rows, cols);

    console.log(start, waypoints, end);
}

function getEntryExitPoint(side, rows, cols) {
    let point = {x: 0, y: 0};
    let off = 0;
    switch (side) {
        case SIDES.TOP:
            off = Math.floor(Math.random() * (cols - 1));
            point = convertGridToPixel({x: off, y: -1});
            break;
        case SIDES.RIGHT:
            off = Math.floor(Math.random() * (rows - 1));
            point = convertGridToPixel({x: cols, y: off});
            break;
        case SIDES.BOTTOM:
            off = Math.floor(Math.random() * (cols - 1));
            point = convertGridToPixel({x: off, y: rows});
            break;
        case SIDES.LEFT:
            off = Math.floor(Math.random() * (rows - 1));
            point = convertGridToPixel({x: -1, y: off});
            break;
        default:
            throw new Error('invalid side');
    }

    return point;
}

function convertGridToPixel(point) {
    return {x: CELL_WIDTH * (point.x + 1/2), y: CELL_WIDTH * (point.y + 1/2)};
}

function damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

var Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function Enemy (scene)
    {
        /** @todo add enemy sprite to assets and asset loader */
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

        this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
    },
    update: function (time, delta)
    {
        this.follower.t += ENEMY_SPEED * delta;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }
    },
    startOnPath: function ()
    {
        this.follower.t = 0;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.hp = 100;
    },
    receiveDamage: function(damage) {
        this.hp -= damage;

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

var Turret = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    },
    place: function (i, j) {
        this.y = i * CELL_WIDTH + CELL_WIDTH/2;
        this.x = j * CELL_WIDTH + CELL_WIDTH/2;
        map[i][j] = 1;
    },
    update: function(time, delta)
    {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    },
    fire: function() {
        var enemy = getEnemy(this.x, this.y, 500);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
});

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.dx = 0;
            this.dy = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

    fire: function (x, y, angle)
    {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        //  we don't need to rotate the bullets as they are round
        //  this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 300;
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});