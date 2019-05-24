
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});

/* Animations */
Q.animations("fireHotHead", {
    fire:{
        frames: [0, 1],
        rate: 1/10,
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
        this.killPlayer = true;
        this.max_life = 0.5;

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

        const dir = (entity.p.direction === "left" ? -1 : 1);
        const kirby = Q("Kirby").first();
        const dx = kirby.p.x - entity.p.x, dy = kirby.p.y - entity.p.y;
        const angle = Math.atan2(-dy, dx); //  && Math.abs(angle) < Math.PI / 4
        if(((dir <= 0 && angle >= 3 * Math.PI / 4) || (dir >= 0 && angle < Math.PI / 4) ) && Math.sign(dy) <= 0){ // Visible in 45º angle and same direction
            const ds = 1 / Math.sqrt(dx ** 2 + dy ** 2);
            this.p.vx = dx * ds * 300;
            this.p.vy = dy * ds * 300;
        }else{
            this.p.vx = 300 * dir;
        }
        this.p.flip = entity.p.flip;
    },

});





