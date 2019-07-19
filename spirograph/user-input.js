"use strict";

var spiro = spiro || {};

spiro.userInput = () => {
    let userInput = {};

    userInput.subscribers = {};

    userInput.init = () => {
        userInput.buildListeners();
    };

    userInput.buildListeners = () => {
        let config = spiro.config['userInput'];

        for (let grouping in config) {
            for (let idName in config[grouping]) {
                let element = document.getElementById(config[grouping][idName]);

                if (element === null) {
                    throw new Error('Missing input with id: ' + config[grouping][idName]);
                }

                element.onchange = () => {
                    userInput.dispatch(grouping);
                };
            }
        }
    };

    userInput.dispatch = (grouping) => {
        let subscribers = userInput.subscribers[grouping];

        if (subscribers !== undefined) {
            subscribers.map((subHandler) => {
                subHandler();
            });
        }
    };

    userInput.subscribe = (grouping, callback) => {
        if (userInput.subscribers[grouping] === undefined) {
            userInput.subscribers[grouping] = [];
        }
        userInput.subscribers[grouping].push(callback);
    };

    userInput.getValue = (id) => {
        let element = document.getElementById(id);
        if (element.type !== 'checkbox') {
            return element.value;
        }

        return element.checked;
    };

    userInput.init();

    return userInput;
};