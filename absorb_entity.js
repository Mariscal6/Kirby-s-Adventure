/* Load Sprite */
compiling.sheet.push({
    "png_path": "absorbing_particles.png",
    "json_path": "absorbing_particles.json"
});

/* Animations */
Q.animations("particulas", {
    absorb: {
        frames: [0,1,2],
        collision_box: {
            width: 64,
            height: 64,
        }
    },

});

Q.Sprite.extend("Absorb", {

    init: function(p){
        console.log(Q("Kirby").first().p.x);
        this._super(p, {
            sheet: "particulas",
            sprite: "particulas",
            x:127,
            y:350,
            isStatue: false
        });
        
        // Flying
        this.flyingTime = 0;

        this.add("Entity");

        /* Events */
        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");
    },

    /* END ATTACK */
    highJump: function(){
        this.trigger("change_state", KIRBY_STATE.HIGHJUMP);
        this.p.gravity = 0.5;
    },

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        this.trigger("cplay", "absorb");
        var kirby = Q("Kirby");
        this.p.x = kirby.first().p.x;
    },

});





