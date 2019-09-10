"use strict";

var vs = vs || {};

vs.clickTarget = () => {
    let ct = {};

    ct.cid = 0;
    ct.subscribers = {};

    ct.addSubscriber = (callback) => {
        ct.subscribers[ct.cid] = callback;

        return ct.cid++;
    };

    ct.removeSubscriber = (id) => {
        ct.subscribers[id] = undefined;
    };

    ct.target = (pos) => {
        for (let i in ct.subscribers) {
            let func = ct.subscribers[i];

            if (!vs.isFunction(func)) {
                vs.callingNonFunctionError();
            }

            func(pos);
        }
    };

    return ct;
};
