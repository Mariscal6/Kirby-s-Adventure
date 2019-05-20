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
Q.Sprite.extend("BlowMissile", {

    init: function(p){
        this._super(p, {
            sheet: "blow",
            sprite: "blow_missile",
            gravity: false,
            skipCollision: true,
        });
        this.add("Entity, Particle");

        this.isEntity = false;

        this.max_life = 0.4;
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

    respawn: function(){
        const kirby = Q("Kirby").first();
        const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
        this.p.x = kirby.p.x + (32 + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y;
        this.p.vx = 300 * (kirby.p.direction === "left" ? -1 : 1) + kirby.p.vx;
        this.p.skipCollision = true;
        this.p.gravity = false;
        this.p.flip = kirby.p.flip;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.play("blow");
        }
    },

});





