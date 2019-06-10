"use strict";

function Dictionary() {
    this.words = {
        timothy: new Word('t;ih m;o th;e'),
        smith: new Word('s;null m;ih th;null'),
        hello: new Word('h;eh l;o'),
        world: new Word('w;o r;null l;null d;null')
    };

    this.lookupWord = function(word) {
        if (this.words[word] === undefined) {
            throw new Error('Undefined word in dictionary: ' + word);
        }

        return this.words[word];
    };
}
