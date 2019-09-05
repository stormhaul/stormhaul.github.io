"use strict";

var vs = vs || {};

vs.mouseEvent = (e) => {
    let me = {};

    me.pos = vs.point(e.x, e.y);
    me.type = e.type;
    me.button = e.which;

    me.getPosition = () => {
        return me.pos;
    };

    me.getType = () => {
        return me.type;
    };

    me.getButton = () => {
        return me.button;
    };

    return me;
};