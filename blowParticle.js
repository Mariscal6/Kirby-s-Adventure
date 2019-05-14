/* Load Sprite */

compiling.sheet.push({
    "png_path": "blowCloud.png",
    "json_path": "blowCloud.json"
});

Q.animations("blowParticle", {
    blow: {
        frames: [0],
        rate: 1/8, 
        collision_box: {
            width: 64,
            height: 64,
        }
    },

});


/* Animations */
Q.Sprite.extend("Blow", {

    init: function(p){
        console.log(0);
        this._super(p, {
            sheet: "blowParticle",
            sprite: "blowParticle",
            gravity:0,
            skipCollision: true,
        });
        this.add("Entity");
        this.cloudTime=0;
    },
    // Update Step
    step: function(dt){
        this.trigger("cplay", "blow")
    },

});





