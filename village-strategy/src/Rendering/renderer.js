"use strict";

var vs = vs || {};

vs.renderer = () => {
    let r = {};

    r.ctx = vs.context();

    r.initLayers = () => {
        r.layers = {};

        r.layers[LAYERS_BACKGROUND] = vs.layer();
        r.layers[LAYERS_FIXED]      = vs.layer();
        r.layers[LAYERS_MOBILE]     = vs.layer();
        r.layers[LAYERS_LABEL]      = vs.layer();
    };

    r.registerRenderable = (e) => {
        let layer  = e.data.layer;

        if (r.layers[layer] === undefined) {
            vs.unknownLayerError();
        }

        r.layers[layer].addItem(e.data.callback);
    };

    /**
     * Wipes the canvas, draws each item in each layer in order, the wipes the layers out for the next frame.
     */
    r.drawFrame = () => {
        r.ctx.wipe();

        for (let i in r.layers) {
            r.layers[i].draw(r.ctx);
        }

        r.initLayers();
    };

    r.initLayers();

    document.addEventListener(EVENTS_REGISTER_RENDERABLE, r.registerRenderable);

    return r;
};