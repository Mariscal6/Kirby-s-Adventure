/* Load Sprite */

compiling.sheet.push({
    "png_path": "cloud_particle.png",
    "json_path": "cloud_particle.json"
});

Q.animations("cloudExplosion", {
    slide: {
        frames: [0,1],
        rate: 1/8, 
        collision_box: {
            width: 32,
            height: 20,
        }
    },
});


/* Animations */
Q.Sprite.extend("CloudParticle", {

    init: function(p){
        this._super(p, {
            sheet: "slide",
            sprite: "cloudExplosion",
            gravity: false,
            skipCollision: true,
        });

        this.add("Particle");

        this.max_life = Number.MAX_SAFE_INTEGER;
    },

    respawn: function(){
        this.onScreen = true;
        const kirby = Q("Kirby").first();
        const animation = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box;
        this.p.x = kirby.p.x - (16 + animation.width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y + animation.height / 2;
    },

    // Update Step
    step: function(dt){
        this.play("slide");
    },

});





