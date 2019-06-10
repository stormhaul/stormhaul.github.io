"use strict";

/**
 * @param sound string
 * @constructor
 */
function Vowel(sound) {
    this.sounds = {
        a: 0b10000,
        e: 0b01000,
        i: 0b00100,
        o: 0b00010,
        u: 0b00001,
        ah: 0b11000,
        eh: 0b01100,
        ih: 0b00110,
        ou: 0b00011,
        uh: 0b10001,
        oi: 0b11010,
        oo: 0b00111,
        null: 0b00000
    };

    if (this.sounds[sound] === undefined) {
        throw new Error("Undefined consonant sound: " + sound);
    }
    this.sound = this.sounds[sound];
}
