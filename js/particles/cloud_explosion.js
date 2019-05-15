/* Load Sprite */

compiling.sheet.push({
    "png_path": "cloud_explosion.png",
    "json_path": "cloud_explosion.json"
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
Q.Sprite.extend("cloudExplosion", {

    init: function(p){
        this._super(p, {
            sheet: "slide",
            sprite: "cloudExplosion",
            gravity: false,
            skipCollision: true,
        });

        this.add("Particle");

        this.max_life = 0.1;
    },

    respawn: function(){
        const kirby = Q("Kirby").first();
        const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
        this.p.x = kirby.p.x - (16 + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y + 5;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.play("slide");
        }
    },

});





