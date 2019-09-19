"use strict";

var tc = tc || {};

tc.uid = (depth = 0) => {
    let id = '_' + Math.random().toString(36).substr(2, 9);

    if (tc._uidMap[id] === undefined) {
        tc._uidMap[id] = true;
        return id;
    }

    if (depth > 100) {
        console.log(tc._uidMap);
        throw new Error('Prevented infinite hang in id generation');
    }

    return tc.uid(depth + 1);
};

tc._uidMap = {};