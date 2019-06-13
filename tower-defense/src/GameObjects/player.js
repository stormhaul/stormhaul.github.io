"use strict";

function Player() {
    this.gold = 400;
    this.lives = 25;
}

/**
 * @param amount {int}
 * @returns {boolean}
 */
Player.prototype.hasGold = function(amount) {
    return this.gold >= amount;
};

/**
 * Adds an integer to player's gold
 *
 * @param amount {int}
 */
Player.prototype.addGold = function(amount) {
    this.gold += amount;
};

/**
 * Adds integer to player's lives
 *
 * @param amount
 */
Player.prototype.addLives = function(amount) {
    this.lives += amount;
    if (this.lives <= 0) {
        this.lose();
    }
};

Player.prototype.lose = function() {
    document.dispatchEvent(new PlayerLoseEvent());
};
