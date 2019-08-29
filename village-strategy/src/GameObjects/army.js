"use strict";

var vs = vs || {};

vs.army = (id, amount, targetVillage, sourceVillage, teamId) => {
    let army = {};

    army.id = id;
    army.requestedAmount = amount;
    army.pop = 0;
    army.tgt = targetVillage;
    army.src = sourceVillage;
    army.soldiers = {};
    army.lineWidth = ARMY_LINE_WIDTH;
    army.teamId = teamId;

    army.addWave = () => {
        if (army.pop < army.requestedAmount && army.src.getPopulation() > 0) {
            let amt = Math.min(
                army.requestedAmount - army.pop,
                army.src.getPopulation(),
                army.lineWidth
            );

            army.src.disatch(amt);

            for (let i = 0; i < amt; i++) {
                army.pop++;
                army.soldiers[army.pop + i] = vs.soldier(army.id, army.pop + i);
            }
        }
    };

    army.removeUnit = (id) => {
        if (army.soldiers[id] !== undefined) {
            army.pop--;
        }
        army.soldiers[id] = undefined;
    };

    army.render = (ctx) => {
        let positions = [];
        for (let i in army.soldiers) {
            let soldier = army.soldiers[i];

            positions.push(soldier.getPosition());

            soldier.render();
        }

        let labelLocation = positions[0].middleOf(...(positions.slice(1)));

        army.renderLabel(labelLocation, army.pop, army.teamId, ctx);
    };

    army.renderLabel = (position, population, teamId, ctx) => {
        let color = TEAM_COLORS[teamId];

        if (color === undefined) {
            vs.unknownTeamError();
        }

        //render label for army
    };

    return army;
};