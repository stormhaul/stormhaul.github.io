"use strict";

class Die {
    constructor(faces = 6) {
        this.faces = faces;
    }

    roll(explosive = false) {
        if (!explosive) {
            return Math.ceil(Math.random() * this.faces);
        }
        let total = 0;

        let roll = Math.ceil(Math.random() * this.faces);
        total += roll;

        while (roll === this.faces) {
            roll = Math.ceil(Math.random() * this.faces);
            total += roll;
        }

        return total;
    }
}
