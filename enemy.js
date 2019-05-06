/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle.png",
    "json_path": "enemies.json"
});


/* Animations */
Q.animations("Waddle", {
    idle: {
        frames: [0],
        collision_box: {
            width: 19,
            height: 16,
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
        });


        this.add("platformerControls, Entity");

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
       
    },

});





