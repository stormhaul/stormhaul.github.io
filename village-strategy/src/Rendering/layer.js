"use strict";

var vs = vs || {};

vs.layer = () => {
    let l = {};

    l.contents = [];

    l.addItem = (callback) => {
        l.contents.push(callback);
    };

    l.draw = (ctx) => {
        l.contents.map((render) => {
            render(ctx);
        });
    };

    return l;
};