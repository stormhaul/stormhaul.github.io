"use strict";

/**
 * @param sound string
 * @constructor
 */
function Consonant(sound) {
    this.sounds = {
        b: 0b10000,
        d: 0b01000,
        f: 0b00100,
        g: 0b00010,
        h: 0b00001,
        j: 0b11000,
        k: 0b01100,
        l: 0b00110,
        m: 0b00011,
        n: 0b10001,
        p: 0b11100,
        r: 0b01110,
        s: 0b00111,
        t: 0b10011,
        v: 0b11001,
        w: 0b11110,
        z: 0b01111,
        zh: 0b10111,
        ch: 0b11011,
        sh: 0b11101,
        th: 0b11111,
        ng: 0b10100,
        y: 0b01001,
        null: 0b00000
    };

    if (this.sounds[sound] === undefined) {
        throw new Error("Undefined consonant sound: " + sound);
    }
    this.sound = this.sounds[sound];
}
