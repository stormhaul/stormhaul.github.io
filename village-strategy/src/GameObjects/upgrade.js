"use strict";

let vs = vs || {};

vs.upgrade = (target, value) => {
    let up = {};

    up.target = target;
    up.value  = value;

    return up;
};