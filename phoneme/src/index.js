"use strict";

function init() {
    let sentence = "hello rob nice my name is timothy smith coy zoo".split(' ');

    let dictionary = new Dictionary();
    let factory = new PhonemeFactory();
    let renderer = new Renderer();

    // renderer.drawSentence(sentence, dictionary, factory);

    let tc = new Consonant('b');
    let tv = new Vowel('a');

    let words = [];
    for (let i in tc.sounds) {
        for (let j in tv.sounds) {
            if (i === j) {
                continue;
            }
            words.push({
                phonemes: factory.buildPhoneme(i + ':' + j)
            });
        }
    }
    console.log(words);
    renderer.drawSentence(words);
    console.log(sentence);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});