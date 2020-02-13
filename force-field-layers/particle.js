var ffl = ffl || {};

ffl.particle = function () {
    let p = {};

    p.position = ffl.vector(
        ffl.helpers.math.rInt(0, ffl.config.WIDTH),
        ffl.helpers.math.rInt(0, ffl.config.HEIGHT)
    );

    p.velocity = ffl.vector(0, 0);

    p.applyForce = (vector) => {
        p.velocity = p.velocity.add(vector.mult(ffl.config.ACCELERATION_FACTOR));
    };

    p.render = (ctx) => {
        ctx.circle(p.position, ffl.config.particles.radius, ffl.config.particles.color);
    };

    p.move = () => {
        p.position = p.position.add(p.velocity);
        p.velocity = p.velocity.mult(ffl.config.particles.resistance);
    };

    return p;
};
