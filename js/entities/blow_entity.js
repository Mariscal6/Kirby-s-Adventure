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
        console.log(p);
        this._super(p, {
            sheet: "blowParticle",
            sprite: "blowParticle",
            gravity: false,
            x: 113,
            y: 496,
            skipCollision: true,
        });
        this.add("Entity");
        this.cloudTime = 0;
    },
    // Update Step
    step: function(dt){
        
        this.trigger("cplay", "blow");
        
        //console.log(this.p.x, this.p.y);

        const kirby = Q("Kirby").first();
        //const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
        //console.log(Q.animation(kirby.p.sprite, kirby.p.animation));
        /*const absorb_collision_width = Q.animation(this.p.sprite, this.p.animation).collision_box.width;

        this.p.x = kirby.p.x + (absorb_collision_width + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);*/

    },

});





