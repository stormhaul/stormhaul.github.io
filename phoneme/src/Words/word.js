"use strict";

function Word(phonetic) {
    this.phonemes = this.generatePhonemes(phonetic);
}

Word.prototype.generatePhonemes = function(string) {
    return string.split(' ');
};
