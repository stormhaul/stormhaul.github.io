"use strict";

/**
 * @param id {int}
 * @param path {Array: {Point}}
 * @param wave {int}
 * @constructor
 */
function Enemy(id, path, wave) {
    this.id = id;
    this.baseHealth = 100000;
    this.speed      = 10;
    this.goldValue  = 20;

    this.health = this.baseHealth * Math.pow(1.02, wave);
    this.path = path;
    this.step = 1;
    this.position = this.path[this.step - 1];
    this.target = this.path[this.step];

    this.color = 'red';
    this.radius = 5;
}

Enemy.prototype.render = function(transformationMatrix, ctx) {
    ctx.fillStyle = this.color;
    ctx.drawCircle(new Point(transformationMatrix.x(this.position.x), transformationMatrix.y(this.position.y)), this.radius, true);
};

Enemy.prototype.move = function(){
    let targDist = distance(this.position, this.target);

    if (targDist <= this.speed) {
        let previous = this.target;
        this.getNextWaypoint();
        let leftover = this.speed - targDist;

        this.position = pointTowardsPosition(previous, this.target, leftover);
        return;
    }

    this.position = pointTowardsPosition(this.position, this.target, this.speed);
};

Enemy.prototype.die = function() {
    document.dispatchEvent(new EnemyDiedEvent(this.id, this.goldValue));
};

Enemy.prototype.escape = function() {
    document.dispatchEvent(new EnemyEscapedEvent(this.id));
};

Enemy.prototype.removeHealth = function(amount) {
    this.health -= amount;
    if (this.health <= 0) {
        this.die();
    }
};

Enemy.prototype.getNextWaypoint = function() {
    this.step++;
    if (this.path[this.step] === undefined) {
        this.escape();
    }

    this.target = this.path[this.step];
};
