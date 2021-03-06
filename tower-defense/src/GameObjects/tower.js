"use strict";

function Tower(id, position) {
    this.id = id;
    this.range = 500;
    this.damage = 20;
    this.attacksPerSecond = .5;
    this.attackAnimationDuration = 200;
    this.position = position;
    this.cooldown = false;

    this.radius = 20;
    this.innerRadius = 5;
    this.outerColor = 'grey';
    this.innerColor = 'green';
}

Tower.prototype.render = function(transformationMatrix, ctx) {
    ctx.fillStyle = this.outerColor;
    ctx.drawCircle(new Point(transformationMatrix.x(this.position.x), transformationMatrix.y(this.position.y)), this.radius, true);

    ctx.fillStyle = this.innerColor;
    ctx.drawCircle(new Point(transformationMatrix.x(this.position.x), transformationMatrix.y(this.position.y)), this.innerRadius, true);
};

/**
 * @param enemies {Array: {Enemy}}
 * @returns {Array}
 */
Tower.prototype.findTargets = function(enemies) {
    let that = this;

    let targets = [];
    enemies.map(function(a) {
        console.log(a, that.enemyInRange(a));
        if (that.enemyInRange(a)) {
            targets.push(a);
        }
    });

    return targets;
};

/**
 * Runs target prioritization on available targets
 *
 * @param targets {Array: {Enemy}}
 * @returns {Enemy}
 */
Tower.prototype.selectTarget = function(targets) {
    let that = this;

    let closest = null;
    let closestDist = null;
    targets.map(function(target) {
        let dist = distance(that.position, target.position);
        if (closestDist === null || dist < closestDist) {
            closest = target;
            closestDist = dist;
        }
    });

    return closest;
};

/**
 * @param enemies {Array: {Enemy}}
 * @param renderer {Renderer}
 */
Tower.prototype.attack = function(enemies, renderer) {
    console.log(enemies, renderer);
    if (this.cooldown) {
        return;
    }

    let targets = this.findTargets(enemies);
    console.log(targets);
    let selected = this.selectTarget(targets);

    selected.removeHealth(this.damage);
    this.setCooldown();

    renderer.addRenderable(new TowerAttack(renderer.getRenderableId(), this.position, selected.position, this.attackAnimationDuration, renderer));
};

Tower.prototype.setCooldown = function() {
    this.cooldown = true;
    let that = this;

    let timeout = 1000 / this.attacksPerSecond;

    setTimeout(function() {
        that.cooldown = false;
    }, timeout);
};

Tower.prototype.enemyInRange = function(enemy) {
    console.log(this.range, distance(this.position, enemy.position));
    return this.range >= distance(this.position, enemy.position);
};
