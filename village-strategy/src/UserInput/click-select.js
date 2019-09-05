"use strict";

var vs = vs || {};

vs.clickSelect = () => {
    let cs = {};

    cs.cid = 0;
    cs.subscribers = {};

    cs.addSubscriber = (callback) => {
        cs.subscribers[cs.cid] = callback;

        return cs.cid++;
    };

    cs.removeSubscriber = (id) => {
        cs.subscribers[id] = undefined;
    };

    cs.select = (pos) => {
        for (let i in cs.subscribers) {
            let func = cs.subscribers[i];

            if (!vs.isFunction(func)) {
                vs.callingNonFunctionError();
            }

            func(pos);
        }
    };

    return cs;
};
