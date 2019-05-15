/* Load Sprite */

compiling.sheet.push({
    "png_path": "blowCloud.png",
    "json_path": "blowCloud.json"
});

Q.animations("blow_missile", {
    blow: {
        frames: [0],
        rate: 1/8, 
        collision_box: {
            width: 32,
            height: 32,
        }
    },

});


/* Animations */
Q.Sprite.extend("Blow", {

    init: function(p){
        this._super(p, {
            sheet: "blow",
            sprite: "blow_missile",
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
            if(!this.cloudTime){
                this.trigger("cplay", "blow");
                const kirby = Q("Kirby").first();
                const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
                const absorb_collision_width = Q.animation(this.p.sprite, this.p.animation).collision_box.width;
                this.p.x = kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
                this.p.y = kirby.p.y;
                this.p.vx= 200 *(kirby.p.direction === "left" ? -1 : 1) + kirby.p.vx;
                this.p.skipCollision = true;
                this.p.gravity = false;
                this.p.flip = kirby.p.flip;
                this.cloudTime += dt;
            }else{
                this.cloudTime+=dt;
                if(this.cloudTime>=0.6){
                    this.onScreen = 0;
                    this.cloudTime = 0;
                }
                else if(this.cloudTime>=0.3){
                    this.p.vx = 0;
                }
            }
        }

    },

});





