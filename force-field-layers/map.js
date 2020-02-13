var ffl = ffl || {};

// Connects the force fields, particles and their environments together
// Overflow in any direction is continued on the opposite side with the same momentum
ffl.map = function (ctx) {
    let m = {};

    m.origin = ffl.vector(0,0);
    m.width = ffl.config.WIDTH;
    m.height = ffl.config.HEIGHT;
    m.generator = ffl.fieldGenerator(m.origin, m.width, m.height);
    m.forces = [];
    m.forceArrowGrid = ffl.forceArrowGrid(m.width, m.height, m.forces);
    m.particles = [];
    for (let i = 0; i < ffl.config.particles.MAX_PARTICLES; i++) {
        m.particles.push(ffl.particle());
    }
    m.ctx = ctx;

    m.update = () => {
        m.accelerateParticles();
        m.moveParticles();
    };

    m.render = () => {
        m.ctx.clear();
        // m.forceArrowGrid.render(m.ctx);
        m.particles.map(particle => particle.render(m.ctx));
    };

    m.accelerateParticles = () => {
        m.particles.map(particle => {
            m.forces.map(forceField => {
                particle.applyForce(forceField.getForceAt(particle.position));
            });
        });
    };

    m.moveParticles = () => {
        m.particles.map(particle => {
            particle.move();

            let boundOutRight = particle.position.x - (m.origin.x + m.width);
            if (boundOutRight > 0) {
                particle.position = ffl.vector(
                    m.origin.x + boundOutRight,
                    particle.position.y
                );
            }

            let boundOutDown = particle.position.y - (m.origin.y + m.height);
            if (boundOutDown > 0) {
                particle.position = ffl.vector(
                    particle.position.x,
                    m.origin.y + boundOutDown
                );
            }

            let boundOutLeft = m.origin.x - particle.position.x;
            if (boundOutLeft > 0) {
                particle.position = ffl.vector(
                    m.origin.x + m.width - boundOutLeft,
                    particle.position.y
                );
            }

            let boundOutTop = m.origin.y - particle.position.y;
            if (boundOutTop > 0) {
                particle.position = ffl.vector(
                    particle.position.x,
                    m.origin.y + m.height - boundOutTop
                );
            }
        });
    };

    m.generateForces = () => {
        m.forces = [];

        // m.forces.push(m.generator.generate(100, 50));
        // m.forces.push(m.generator.generate(100, 50));
        // m.forces.push(m.generator.generate(100, 50));
        // m.forces.push(m.generator.generate(100, 50));
        // m.forces.push(m.generator.generate(100, 50));
        // m.forces.push(m.generator.generate(100, 50));
        m.forces.push(m.generator.generateSpiral(10, 10));

        m.forceArrowGrid = ffl.forceArrowGrid(m.width, m.height, m.forces);
    };

    m.generateForces();

    return m;
};
