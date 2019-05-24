
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});

/* Animations */
Q.animations("fireHotHead", {
    fire:{
        frames: [0, 1],
        rate:1 / 10,
        collision_box: {
            width: 32,
            height: 32,
        },
    },
});

Q.Sprite.extend("FireHotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "fire",
            sprite: "fireHotHead",
            animation: "fire",
            skipCollision: true,
            gravity: false,
        });

        this.add("Entity, Particle");
        this.isEntity = false;
        this.max_life = 0.4;

        /* Events */
        /*this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){

            if(!collision.obj.isA("Kirby")){
                this.p.flip = (this.p.direction === "left") ? "x" : false;
            }
            if(collision.obj.isA("Kirby")){
               this.trigger("change_state", FIREHOTHEAD_STATE.DIE);
            }
            else if(collision.obj.isA("Hill")){
                this.trigger("change_state", FIREHOTHEAD_STATE.DIE);
            }
 
        });*/

    },
  
    respawn: function(entity){
        this.onScreen = true;
        const collision_width = Q.animation(entity.p.sprite, entity.p.animation).collision_box.width;
        this.p.x = entity.p.x + (32 + collision_width) / 2 * (entity.p.direction === "left" ? -1 : 1);
        this.p.y = entity.p.y;
        this.p.vx = 300 * (entity.p.direction === "left" ? -1 : 1) + entity.p.vx;
        this.p.flip = entity.p.flip;
    },

});





