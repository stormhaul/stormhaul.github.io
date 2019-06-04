"use strict";

function Attribute(name, value) {
    let that = this;
    this.name = name;
    this.value = value;
    this.getModifier = function() {return Math.floor(that.value/2) - 5;};
}