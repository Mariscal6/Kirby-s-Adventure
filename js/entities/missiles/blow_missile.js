/* Load Sprite */

compiling.sheet.push({
    "png_path": "blowCloud.png",
    "json_path": "blowCloud.json"
});

Q.animations("blow_missile", {
    blow: {
        frames: [0],
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die: {
        frames: [1],
        collision_box: {
            width: 32,
            height: 32,
        }
    }

});


/* Animations */
Q.Sprite.extend("BlowMissile", {

    init: function(p){
        this._super(p, {
            sheet: "blow",
            sprite: "blow_missile",
            gravity: false,
            skipCollision: true,
        });
        this.add("Entity, Particle");

        this.isEntity = false;

        this.max_life = 0.4;

        this.die_time = 0.0;

        this.killEnemy = true;

        this.on("bump", this, "collision");
    },

    collision: function(collide){
        if(!collide.obj.isEnemy) return;
        this.die_time = 0.001;
    },

    respawn: function(){
        this.onScreen = true;
        const kirby = Q("Kirby").first();
        const kirby_collision_width = Q.animation(kirby.p.sprite, kirby.p.animation).collision_box.width;
        this.p.x = kirby.p.x + (32 + kirby_collision_width) / 2 * (kirby.p.direction === "left" ? -1 : 1);
        this.p.y = kirby.p.y;
        this.p.vx = 300 * (kirby.p.direction === "left" ? -1 : 1) + kirby.p.vx;
        this.p.flip = kirby.p.flip;
    },

    step: function(dt){
        if(this.die_time !== 0.0){
            this.p.vx = 0;
            this.play("die");
            this.die_time += dt;
            if(this.die_time >= 0.15){
                this.die_time = 0.0;
                this.trigger("die");
            }
        }else{
            this.play("blow");
        }
    },

});