/* Load Sprite */

compiling.sheet.push({
    "png_path": "absorbing.png",
    "json_path": "absorbing.json"
});

Q.animations("absorb_missile", {
    absorb: {
        frames: [0, 1, 2, 3, 4, 5],
        rate: 1/16, 
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
        this.add("Entity, Particle");

        this.isEntity = false;

    },

    respawn: function(){
        const kirby = Q("Kirby").first();
        const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;

        this.p.x = kirby.p.x + (64 + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y;

        this.p.flip = kirby.p.flip;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.play("absorb");
        }
    },

});





