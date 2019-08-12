"use strict";

var l = l || {};

/**
 * @param type {string}
 * @param position {x, y}
 * @param userInput {userInput}
 * @param renderer {renderer}
 * @param config {config}
 * @returns {waterParent}
 */
l.waterParent = (type, position, userInput, renderer, config) => {
    if (l.water[type] === undefined) {
        throw new Error('Undefined Constructor: ' + type);
    }

    let object = l.water[type](userInput, renderer, config);

    object.draw = (shadow = true) => {
        object.render(shadow);
    };

    object.progress = (allFish) => {
        object.updatePosition(allFish);
    };

    object.init(position);

    return object;
};
