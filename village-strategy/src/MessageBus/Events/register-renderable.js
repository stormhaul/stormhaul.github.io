"use strict";

var vs = vs || {};

vs.registerRenderable = (renderCallback, layer) => {
    let e = new Event(EVENTS_REGISTER_RENDERABLE);

    e.data = {
        callback: renderCallback,
        layer: layer
    };

    document.dispatchEvent(e);

    return e;
};