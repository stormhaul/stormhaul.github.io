"use strict";

// this is a terrible idea.
class RaceFactory {
    constructor(UI) {
        this.UI = UI;
    }

    buildRace(type) {
        let methodName = '_build' + this.ucfirst(type);

        return this[methodName]();
    }

    _buildDragonborn() {
        // pulled from race file global scope included.
        let dragonborn = dragonbornInitializer;

        this.UI.request();
    }

    ucfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}