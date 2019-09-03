"use strict";

var vs = vs || {};

vs.village = (location, population, teamId = 0, upgrades = []) => {
    let v = {};

    v.pos        = location;
    v.pop        = population;
    v.teamId     = teamId;
    v.upgrades   = upgrades;
    v.growCalls  = 0;
    v.isSelected = false;

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
        v.growCalls++;
        if (v.teamId !== 0 && v.growCalls % VILLAGE_FRAMES_PER_GROWTH_STEP === 0) {
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
        if (v.isSelected) {
            ctx.dottedCircle(v.pos, DEFAULT_VILLAGE_RADIUS + 5, 'white');
        }
    };

    v.register = () => {
        document.dispatchEvent(vs.registerRenderable(v.render, LAYERS_FIXED));
    };

    // Determine if point is within the village radius.
    v.pointIsInside = (point) => {
        return point.dist(v.pos) <= DEFAULT_VILLAGE_RADIUS;
    };

    // Uses sum of triangles to determine if the center of the village is within the box passed to the function.
    v.isBounded = (p1, p2, p3, p4) => {
        let rArea = p1.rectangleArea(p2, p3);
        let t1 = p1.triangleArea(v.pos, p4);
        let t2 = p4.triangleArea(v.pos, p3);
        let t3 = p3.triangleArea(v.pos, p2);
        let t4 = p1.triangleArea(v.pos, p2);

        return (t1 + t2 + t3 + t4) <= rArea;
    };

    v.select = () => {
        v.isSelected = true;
    };

    v.deselect = () => {
        v.isSelected = false;
    };

    return v;
};
