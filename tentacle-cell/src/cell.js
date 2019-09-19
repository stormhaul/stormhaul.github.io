"use strict";

var tc = tc || {};

tc.cell = (app) => {
    let c = app.sprite(CELL_PATH);

    c.id = tc.uid();
    c.population    = 10;
    c.populationCap = 100;
    c.tentacles     = [];
    c.tentacleCap   = 2; //TODO: Add step logic function based on population
    c.growthRate    = 1; //TODO: Add step logic function based on population
    c.sendRate      = 1; //TODO: Add step logic function based on population and current tentacle count

    c.x  = Math.random() * (CANVAS_WIDTH - CELL_WIDTH) + CELL_HALFWIDTH;
    c.cx = c.x + CELL_HALFWIDTH;
    c.y  = Math.random() * (CANVAS_HEIGHT - CELL_HEIGHT) + CELL_HALFHEIGHT;
    c.cy = c.y + CELL_HALFHEIGHT;

    c.spawnTentacle = (target) => {
        if (c.tentacles.length >= c.tentacleCap) {
            return;
        }

        c.tentacles.push(tc.tentacle(c, target, app));
    };

    c.removeTentacle = (id) => {
        c.tentacles = c.tentacles.filter((item) => {
            return item.id !== id;
        });
    };

    c.drainPopulation = () => {
        if (c.population > 1) {
            c.population--;

            return true;
        }

        return false;
    };

    c.addPopulation = (amount) => {
        c.population += amount;
    };

    return c;
};