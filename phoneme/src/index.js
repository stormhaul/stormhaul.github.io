"use strict";

function init() {
    let sentence = "hello rob nice my name is timothy smith coy zoo".split(' ');

    let dictionary = new Dictionary();
    let factory = new PhonemeFactory();
    let renderer = new Renderer();

    renderer.drawSentence(sentence, dictionary, factory);

    console.log(sentence);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});