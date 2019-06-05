"use strict";

/**
 * @param character Character
 * @constructor
 */
function CharacterBuilder(character = null) {
    if (character !== null) {
        // @todo call load character internal function

        return;
    }
    this.attributes = {};
    this.name = "";
    this.player = "";
    this.class = {level: 0, classes: {}};
    this.classPoints = 1;
    this.race = "";
    this.alignment = "";
    this.experience = 0;
    this.age = 0;
    this.height = '';
    this.weight = 0;
    this.size = "";
    this.skin = "";
    this.hair = "";
    this.traits = {};
    this.ideals = [];
    this.bonds = [];
    this.flaws = [];
    this.feats = {};
    this.maxHp = 0;
    this.currentHp = 0;
    this.deathSaves = {successes: 0, failures: 0};
    this.hitDice = [];
    this.equipment = [];
    this.proficiencies = [];
    this.spells = [];
    this.attacks = [];
    this.actions = [];
    this.bonusActions = [];
    this.movement = [];
}

CharacterBuilder.prototype.addAttribute = function(type, value) {
    this.attributes[type] = new Attribute(type, value);
};

CharacterBuilder.prototype.addName = function(name) {
    this.name = name;
};

CharacterBuilder.prototype.addPlayer = function(player) {
    this.player = player;
};

CharacterBuilder.prototype.allocateClassPoint = function(className) {
    if (this.classPoints === 0) {
        return;
    }
    this.class.level += 1;
    if (this.class.classes[className] === undefined) {
        this.class.classes[className] = 0;
    }
    this.class.classes[className] += 1;
    this.classPoints -= 1;

    // @todo should trigger level up checks here increase proficiency change out hit die, roll additional health or take it. Add slots and class features etc
};

CharacterBuilder.prototype.addRace = function(race) {
    let formerRace = this.race;
    this.race = race;

    // @todo remove former race's features and changes and add new race's stuff size etc
};

CharacterBuilder.prototype.addAlignment = function(alignment) {
    this.alignment = alignment
};

CharacterBuilder.prototype.addExperience = function(exp) {
    let thresholds = [0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,335000, Infinity];

    this.experience += exp;

    let indexOfTarget = 0;
    while (this.experience >= thresholds[indexOfTarget]) {
        indexOfTarget++;
    }

    this.classPoints += indexOfTarget - this.classPoints - this.class.level;
};

CharacterBuilder.prototype.addAge = function(age) {
    this.age = age;
};

CharacterBuilder.prototype.addHeight = function(height) {
    this.height = height;
};

CharacterBuilder.prototype.addWeight = function(weight) {
    this.weight = weight;
};

CharacterBuilder.prototype.addSize = function(size) {
    this.size = size;
};

CharacterBuilder.prototype.addSkin = function(skin) {
    this.skin = skin;
};

CharacterBuilder.prototype.addHair = function(hair) {
    this.hair = hair;
};