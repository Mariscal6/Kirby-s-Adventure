/* Load Sprite */

compiling.sheet.push({
    "png_path": "absorbing.png",
    "json_path": "absorbing.json"
});

Q.animations("particles", {
    absorb: {
        frames: [0, 1, 2],
        rate: 1/8, 
        collision_box: {
            width: 38,
            height: 32,
        }
    },

});


/* Animations */


Q.Sprite.extend("Absorb", {

    init: function(p){
        console.log(Q("Kirby").first().p.x);
        this._super(p, {
            sheet: "particles",
            sprite: "particles",
            gravity:0,
            skipCollision: true,

        });

        this.add("Entity");
    },

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        console.log(Q.animation("particles", "absorb"))
        this.trigger("cplay", "absorb");
        var kirby = Q("Kirby").first();
        this.p.x = kirby.p.x + kirby.p.w-15;
        this.p.y = kirby.p.y ;
    },

});





