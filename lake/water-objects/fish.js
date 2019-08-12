"use strict";

var l = l || {};
l.water = l.water || {};

l.water.fish = (userInput, renderer, config) => {
    let fish = {};

    fish.init = (position) => {
        fish.position = position;
        fish.getTarget();
        fish.lastDistance = l.helper.getCartesianDistance(fish.position, fish.target);
        fish.prevDistance = fish.lastDistance;
        fish.tail = [];
        fish.step = 0;
    };

    fish.render = (shadow = true) => {
        // draw fish using renderer
        if (shadow) {
            fish.drawShape(fish.position, config.fish.color);
            fish.drawTail(fish.tail, fish.position, config.fish.color);
            //fish.render(false);
            return;
        }

        fish.drawShape(config.shadows.offset(fish.position, userInput.mouse.position), config.shadows.color);
        fish.drawTail(fish.tail.map((a) => config.shadows.offset(a, userInput.mouse.position)), config.shadows.offset(fish.position, userInput.mouse.position), config.shadows.color);
    };

    fish.drawShape = (position, color) => {
        let ctx = renderer.ctx;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
        ctx.fill();
    };

    fish.drawTail = (points, position, color) => {
        let ctx = renderer.ctx;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';

        points.map((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                if (l.helper.getCartesianDistance(point, position) >= 5) {
                    ctx.lineTo(point.x, point.y)
                }
            }
        });

        ctx.stroke();
    };

    fish.updatePosition = (allFish) => {
        let nearTarget = l.helper.getCartesianDistance(fish.position, fish.target) < 10;
        let nearLight = l.helper.getCartesianDistance(fish.position, userInput.getMousePosition()) < l.config.fish.stopDistance;
        if (nearTarget && nearLight) {
            console.log('reached end');
            return;
        } else if (nearTarget || fish.lastDistance > fish.prevDistance) {
            console.log('get new target');
            fish.getTarget();
        }

        fish.tail.push({x: fish.position.x, y: fish.position.y});
        if (fish.tail.length > 50) {
            fish.tail.shift();
        }

        let step = l.helper.getRadialVector(Math.min(config.fish.maxVeloctity, fish.distanceToTarget), fish.theta);

        let x = 0;
        let y = 0;

        x += Math.min(config.fish.maxVeloctity, step.x);
        y += Math.min(config.fish.maxVeloctity, step.y);

        if (l.helper.getCartesianDistance(fish.position, userInput.mouse.position) >= config.fish.stopDistance) {
            fish.position.x += x;
            fish.position.y += y;
        }
    };

    fish.getTarget = () => {
        let distance           = l.helper.getRandom(10, l.config.fish.segmentLength);
        let m                  = userInput.getMousePosition();
        fish.distanceToTarget  = l.helper.getCartesianDistance(fish.position, m);
        fish.theta             = l.helper.getTheta(fish.position, m) + l.helper.getRandom(-(l.config.fish.randomAngleRange / 2), l.config.fish.randomAngleRange / 2) * Math.PI / 180;
        fish.target            = l.helper.getRadialVector(distance, fish.theta);
        fish.target.x         += fish.position.x;
        fish.target.y         += fish.position.y;

        fish.prevDistance = fish.lastDistance;
        fish.lastDistance = distance;
    };

    return fish;
};
