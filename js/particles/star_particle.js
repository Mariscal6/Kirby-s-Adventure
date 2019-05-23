/* Load Sprite */

compiling.sheet.push({
    "png_path": "star_particle.png",
    "json_path": "star_particle.json"
});

/*var brujula = {
    N: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x,
                y: kirby.p.y - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: -30,
        vx: 0
    },

    NE: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1),
                y: kirby.p.y - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: -30,
        vx: 30
    },
    NW: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1),
                y: kirby.p.y - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: -30,
        vx: -30
    },
    W: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1),
                y: kirby.p.y
            }
        },
        vy: 0,
        vx: 30
    },
    SW: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x - (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1),
                y: kirby.p.y + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: 30,
        vx: 30
    },
    S: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x,
                y: kirby.p.y + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: 30,
        vx: 0
    },
    SE: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x  + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1),
                y: kirby.p.y + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1)
            }
        },
        vy: 30,
        vx: -30
    },
    E: {
        coordenadas: function (kirby) {
            return {
                x: kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1) ,
                y: kirby.p.y
            }
        },
        vy: 0,
        vx: -30
    },

};*/

Q.animations("star", {
    star: {
        frames: [0],
        rate: 1/8, 
        collision_box: {
            width: 16,
            height: 16,
        }
    },
});


/* Animations */
Q.Sprite.extend("StarParticle", {

    init: function(p){
        this._super(p, {
            sheet: "star_particle",
            sprite: "star",
            gravity: false,
            skipCollision: true,
        });
        this.add("Particle");

        this.max_life = 0.5;
    },

    respawn: function(entity, life = 0.5, vx = 50){

        const collision_width = Q.animation(entity.p.sprite, entity.p.animation).collision_box.width;

        const direction = Math.round(Math.random() * 8);
        const angle = direction * (Math.PI * 2 / 8);
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        const parity = (direction & 0x1);
        const radius = (collision_width + 1 * parity);
        const rx = dx * radius;
        const ry = dy * radius;

        this.p.vx = dx * vx;
        this.p.vy = dy * vx;

        this.p.x = entity.p.x + rx;
        this.p.y = entity.p.y + ry;
        this.max_life = life;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.play('star');
        }
    },

});





