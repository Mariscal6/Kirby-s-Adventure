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
            height: 32,
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
            x: -1000,
            y: -1000,
            skipCollision: true,
        });
        this.add("Entity");

        this.cloudTime = 0;

        this.onScreen = false;

        this.isParticle = true;

    },

    draw: function(ctx){
        if(!this.onScreen) return;
        this._super(ctx);
    },

    // Update
    update: function(dt){
        // Set out of bound
        if(!this.onScreen){
            this.p.x = -1000;
            this.p.y = -1000;
            return;
        }
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.trigger("cplay", "slide");
            const kirby = Q("Kirby").first();
            const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
            const absorb_collision_width = Q.animation(this.p.sprite, this.p.animation).collision_box.width;
            this.p.x = kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
            this.p.y = kirby.p.y+5;
            this.p.skipCollision = true;
            this.p.gravity = false;
            this.p.flip = kirby.p.flip;
            this.cloudTime += dt;
            if(this.cloudTime >=0.5){
                this.onScreen=false;
            }
        }
    },

});





