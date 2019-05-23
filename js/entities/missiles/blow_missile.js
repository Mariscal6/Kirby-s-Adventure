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
        });
        this.add("Missile");

        this.max_life = 0.4;
    },
    
    collision: function(collide){
        if(!collide.obj.isEnemy) return;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.play("blow");
        }
    },

});





