let namespace = 'app';

let loader = require('./Namespace/path-manager.js')();

window.autoLoader = function(classToInclude) {
    return require(loader.getPath(namespace, classToInclude));
};
let grid      = require('./Graph/grid.js')(10,10);
let grid2     = require('./Graph/grid.js')(3,3);
let sceneTest = require('./Scenes/opening.js')();

console.log(grid);
console.log(grid2);
console.log(sceneTest);