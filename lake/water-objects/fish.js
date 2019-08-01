"use strict";

var l = l || {};
l.water = l.water || {};

l.water.fish = (userInput, renderer, config) => {
    let fish = {};

    fish.init = (position) => {
        fish.position = position;
        fish.target = fish.getTarget();
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

        // fish.drawShape(config.shadows.offset(fish.position, userInput.mouse.position), config.shadows.color);
        // fish.drawTail(fish.tail.map((a) => config.shadows.offset(a, userInput.mouse.position)), config.shadows.offset(fish.position, userInput.mouse.position), config.shadows.color);
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
        if (fish.step % 10 === 0) {
            fish.target = fish.getTarget();
        }

        fish.tail.push({x: fish.position.x, y: fish.position.y});
        if (fish.tail.length > 50) {
            fish.tail.shift();
        }

        let step = l.helper.getRadialVector(Math.min(config.fish.maxVeloctity, fish.distanceToTarget), fish.theta);

        let x = 0;
        let y = 0;

        x += step.x;
        y += step.y;

        allFish.map((a) => {
            let dist = l.helper.getCartesianDistance(fish.position, a.position);
            if (dist > 0 && dist < config.fish.flockSpacing) {
                x -= a.position.x - fish.position.x;
                y -= a.position.y - fish.position.y;
            }
        });

        if (l.helper.getCartesianDistance(fish.position, userInput.mouse.position) >= config.fish.stopDistance) {
            fish.position.x += Math.min(config.fish.maxVeloctity, x);
            fish.position.y += Math.min(config.fish.maxVeloctity, y);
        }
    };

    fish.getTarget = () => {
        fish.target = userInput.getMousePosition();

        fish.distanceToTarget = l.helper.getCartesianDistance(fish.position, fish.target);
        fish.theta            = l.helper.getTheta(fish.position, fish.target);
    };

    return fish;
};
