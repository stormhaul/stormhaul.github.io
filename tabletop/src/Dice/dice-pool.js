"use strict";

class DicePool {
    constructor() {
        this.dice = [];
    }

    addDie(faces = 6) {
        this.dice.push(new Die(faces));
    }

    roll() {
        let total = 0;
        let rolls = [];

        this.dice.map(function(d) {
            let roll = {
                sides: d.faces,
                value: d.roll()
            };

            total += roll.value;
            rolls.push(roll);
        });

        return {total: total, rolls: rolls};
    }
}
