/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle1.png",
    "json_path": "waddle.json"
});


/* Animations */
Q.animations("waddle", {
    idle: {
        frames: [0,1],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        }
    }
});

/* Object */


Q.Sprite.extend("Waddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "waddle",
            isStatue: false,
            vx: -20,
        });


        this.add("Entity, aiBounce");

        /* Events */
       
        this.on("attack_end", this, "attack_end");

    },

    attack_end: function(){

        this.absorbType = ABSORB_TYPE.BLOWING;

    },

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
       this.trigger("cplay", "idle");
    },

});





