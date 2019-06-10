"use strict";

function PhonemeFactory() {
    this.consonants = {
        b: new Consonant('b'),
        d: new Consonant('d'),
        f: new Consonant('f'),
        g: new Consonant('g'),
        h: new Consonant('h'),
        j: new Consonant('j'),
        k: new Consonant('k'),
        l: new Consonant('l'),
        m: new Consonant('m'),
        n: new Consonant('n'),
        p: new Consonant('p'),
        r: new Consonant('r'),
        s: new Consonant('s'),
        t: new Consonant('t'),
        v: new Consonant('v'),
        w: new Consonant('w'),
        z: new Consonant('z'),
        zh: new Consonant('zh'),
        ch: new Consonant('ch'),
        sh: new Consonant('sh'),
        th: new Consonant('th'),
        ng: new Consonant('ng'),
        y: new Consonant('y')
    };

    this.vowels = {
        a: new Vowel('a'),
        ah: new Vowel('ah'),
        e: new Vowel('e'),
        eh: new Vowel('eh'),
        i: new Vowel('i'),
        ih: new Vowel('ih'),
        o: new Vowel('o'),
        ou: new Vowel('ou'),
        oi: new Vowel('oi'),
        oo: new Vowel('oo'),
        u: new Vowel('u'),
        uh: new Vowel('uh'),
        null: new Vowel('null'),
    };

    this.delimeter = ';';

    /**
     * @param word Word
     */
    this.phonemeWord = function (word) {
        let out = [];

        for (let i in word.phonemes) {
            out.push(this.buildPhoneme(word.phonemes[i]));
        }

        return out;
    };

    this.buildPhoneme = function(string) {
        let split = string.split(';');
        let con = split[0];
        let vow = split[1];

        if (this.consonants[con] === undefined || this.vowels[vow] === undefined) {
            throw new Error('unknown phoneme: ' + string);
        }

        return new Phoneme(this.consonants[con], this.vowels[vow]);
    }
}