"use strict";

var vs = vs || {};

vs.boxSelect = () => {
    let bs = {};

    bs.cid = 0;
    bs.subscribers = {};

    bs.addSubscriber = (callback) => {
        bs.subscribers[bs.cid] = callback;

        return bs.cid++;
    };

    bs.removeSubscriber = (id) => {
        bs.subscribers[id] = undefined;
    };

    bs.select = (p1, p2, p3, p4) => {
        for (let i in bs.subscribers) {
            let func = bs.subscribers[i];

            if (!vs.isFunction(func)) {
                vs.callingNonFunctionError();
            }

            func(p1, p2, p3, p4);
        }
    };

    return bs;
};
