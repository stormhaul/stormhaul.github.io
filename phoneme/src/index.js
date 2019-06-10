"use strict";

function init() {
    let sentence = "hello world timothy smith".split(' ');

    let dictionary = new Dictionary();
    let factory = new PhonemeFactory();
    let renderer = new Renderer();

    // sentence.map(function(a) {
    //     let word = dictionary.lookupWord(a);
    //     let phonemes = factory.phonemeWord(word);
    //
    //     renderer.drawPhoneme(phonemes[0]);
    //     console.log(phonemes);
    // });


    let word = dictionary.lookupWord(sentence[0]);
    let phonemes = factory.phonemeWord(word);

    //renderer.drawPhoneme(phonemes[0]);
    console.log(phonemes);

    console.log(sentence);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});