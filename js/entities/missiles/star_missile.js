/* Load Sprite */

compiling.sheet.push({
    "png_path": "star_missile.png",
    "json_path": "star_missile.json"
});

Q.animations("star_missile", {
    star: {
        frames: [0, 1, 2, 3],
        rate: 1/16, 
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die: {
        frames: [4, 5],
        rate: 1/16, 
        collision_box: {
            width: 32,
            height: 32,
        }
    }

});

/* Animations */


Q.Sprite.extend("StarMissile", {

    init: function(p){
        this._super(p, {
            sheet: "star_missile",
            sprite: "star_missile",
            gravity: false,
            skipCollision: false,
        });
        this.add("Entity, Particle");

        // Override
        this.isEntity = false;
        this.max_life = 0.8;

        this.time_death = 0;

        this.killEnemy = true;

        this.on("bump", this, "collision");
    },

    collision: function(collide){
        if(!collide.obj.isEnemy) return;
        this.p.vx = 0.0;
    },
    
    respawn: function(){
        this.onScreen = true;
        const kirby = Q("Kirby").first();
        const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;

        this.p.x = kirby.p.x + (16 + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y;
        this.p.vx = 500 * (kirby.p.direction === "left" ? -1 : 1) + kirby.p.vx;

        this.p.flip = kirby.p.flip;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            if(this.p.vx === 0){
                this.play("die");
                this.time_death += dt;
                if(this.time_death >= 2/16){
                    this.time_death = 0.0;
                    this.trigger("die");
                }

            }else{
                this.play("star");
            }
        }
    },

});





