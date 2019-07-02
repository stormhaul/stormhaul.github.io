(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports = function (x, y, contents = null)
{
    return {
        x: x,
        y: y,
        contents: contents
    };
};
},{}],3:[function(require,module,exports){
let cellFactory = require('./cell.js');

module.exports = function(m,n)
{
    let grid = {
        rows: []
    };

    for (let i = 0; i < m; i++) {
        grid.rows.push([]);

        for (let j = 0; j < n; j++) {
            grid.rows[i].push(cellFactory(i, j));
        }
    }

    return grid;
};
},{"./cell.js":2}],4:[function(require,module,exports){
module.exports = function() {
    let ROOT = 'src/';

    let manager = {
        app: {
            path: ROOT,
            events: {
                path: 'Events/',
                dispatcher: {
                    path: 'dispatcher'
                }
            },
            scenes: {
                path: 'Scenes/',
                opening: {
                    path: 'opening'
                },
                parent: {
                    path: 'parent'
                }
            },
            graph: {
                path: 'Graph/',
                grid: {
                    path: 'grid'
                },
                cell: {
                    path: 'cell'
                }
            }
        }
    };


    manager.getDir = function(name) {
        let keys = name.split('.');

        let that = this;

        let path = '';
        that.cur = manager;
        keys.map(function(key) {
            if (that.cur[key] === undefined) {
                throw new Error('Unknown Namespace: ' + key + ' in ' + name);
            }

            that.cur = that.cur[key];
            path += that.cur.path;
        });

        return path + '.js';
    };

    manager.getPath = function(from, to) {
        let fromParts   = from.split('.');
        let toParts     = to.split('.');
        let directories = this.getDir(to).split('/');
        console.log(directories);

        let fileName = toParts[toParts.length - 1];
        let sharedCt = 0;

        for (let i = 0; i < toParts.length; i++) {
            if (toParts[i] === fromParts[i]) {
                sharedCt++;
            }
        }

        let path = '';
        for (let i = 0; i < fromParts.length - sharedCt; i++) {
            path += '../';
        }
        path = path === '' ? './' : path;

        for (let i = sharedCt; i < toParts.length - 1; i++) {
            path += directories[i] + '/';
        }

        path += fileName + '.js';

        return path;
    };

    return manager;
};
},{}],5:[function(require,module,exports){
let eventDispatcher = require('../Events/dispatcher.js')
let sceneParent     = require('./parent.js')(eventDispatcher);

module.exports = function() {
    let opening = {};

    opening.parent = sceneParent;

    opening.startScene = () => {
        opening.parent.startScene();
    };

    opening.endScene = () => {
        opening.parent.endScene();
    };

    return opening;
};
},{"../Events/dispatcher.js":1,"./parent.js":6}],6:[function(require,module,exports){
module.exports = function(eventDispatcher) {
    let parent = {};

    parent.EVENTS = {
        start: 'scene-started',
        end: 'scene-ended'
    };

    parent.startScene = () => {
        let e = new Event(this.EVENTS.start);
        eventDispatcher.dispatchEvent(e);
    };

    parent.endScene = () => {
        let e = new Event(this.EVENTS.end);
        eventDispatcher.dispatchEvent(e);
    };

    return parent;
};
},{}],7:[function(require,module,exports){
let namespace = 'app';

let loader = require('./Namespace/path-manager.js')();

window.autoLoader = function(classToInclude) {
    return require(loader.getPath(namespace, classToInclude));
};
let grid      = require('./Graph/grid.js')(10,10);
let grid2     = require('./Graph/grid.js')(3,3);
let sceneTest = require('./Scenes/opening.js')();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('blue', 'assets/particles/blue.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('blue');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
console.log(game);

console.log(grid);
console.log(grid2);
console.log(sceneTest);
},{"./Graph/grid.js":3,"./Namespace/path-manager.js":4,"./Scenes/opening.js":5}]},{},[7]);
