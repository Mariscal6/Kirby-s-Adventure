/* Load Sprite */

compiling.sheet.push({
    "png_path": "absorbing.png",
    "json_path": "absorbing.json"
});

Q.animations("absorb_missile", {
    absorb: {
        frames: [0, 1, 2],
        rate: 1/8, 
        collision_box: {
            width: 64,
            height: 64,
        }
    },

});

/* Animations */


Q.Sprite.extend("AbsorbMissile", {

    init: function(p){
        this._super(p, {
            sheet: "absorb",
            sprite: "absorb_missile",
            gravity: false,
            skipCollision: true,
        });
        this.add("Entity");

        this.onScreen = false;
        this.isEntity = false;

        this.on("bump", this, "absorbing");
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

    absorbing: function(collide){},

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.trigger("cplay", "absorb");
            const kirby = Q("Kirby").first();
            const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
            const absorb_collision_width = Q.animation(this.p.sprite, this.p.animation).collision_box.width;

            this.p.x = kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
            this.p.y = kirby.p.y;

            this.p.flip = kirby.p.flip;
        }
    },

});





