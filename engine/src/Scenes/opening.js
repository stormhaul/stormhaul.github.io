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