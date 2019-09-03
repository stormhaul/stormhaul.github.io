"use strict";

var vs = vs || {};

vs.village = (location, population, teamId = 0, upgrades = []) => {
    let v = {};

    v.pos      = location;
    v.pop      = population;
    v.teamId   = teamId;
    v.upgrades = upgrades;

    v.getPopulation = () => {
        return v.pop;
    };

    v.calculateGrowthAmount = () => {
        return VILLAGE_GROWTH_RATE + v.getPopulationGrowthUpgradeCount() * VILLAGE_GROWTH_RATE_UPGRADE_VALUE;
    };

    v.getPopulationGrowthUpgradeCount = () => {
        return 0;
    };

    v.calculateDefenseFactor = () => {
        return 1;
    };

    v.calculatePopCap = () => {
        return VILLAGE_POPULATION_CAP;
    };

    v.merge = (n, teamId) => {
        let change = teamId === v.teamId ? n : -n / v.calculateDefenseFactor();
        v.pop += change;

        if (v.pop < 0) {
            v.pop *= -1;
            v.teamId = teamId;
        }
    };

    v.grow = () => {
        if (v.teamId !== 0) {
            v.pop = Math.min(v.calculatePopCap(), v.pop + v.calculateGrowthAmount());
        }
    };

    v.dispatch = (n) => {
        v.pop -= n;
    };

    v.render = (ctx) => {
        let color = TEAM_COLORS[teamId];

        if (color === undefined) {
            vs.unknownTeamError();
        }

        ctx.circle(v.pos, DEFAULT_VILLAGE_RADIUS, color);
        ctx.text(v.pos, DEFAULT_NUMBER_FONT, DEFAULT_NUMBER_FONT_SIZE, 'white', v.pop, 'center');
    };

    v.register = () => {
        document.dispatchEvent(vs.registerRenderable(v.render, LAYERS_FIXED));
    };

    return v;
};