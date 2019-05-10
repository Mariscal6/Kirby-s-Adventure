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
            width: 64,
            height: 64,
        }
    },

});


/* Animations */


Q.Sprite.extend("Absorb", {

    init: function(p){
        this._super(p, {
            sheet: "particles",
            sprite: "particles",
            gravity:0,
            x: 100,
            y: 450,
            skipCollision: true,
        });

        this.onScreen = false;

        this.isParticle = true;

        this.add("Entity");

        this.on("bump", this, "absorbing");
    },

    draw: function(ctx){
        if(!this.onScreen) return;
        this._super(ctx);
    },
    // Update
    update: function(dt){
        // Set out of bound
        if(!this.onScreen){
            this.p.x = -1000;
            this.p.y = -1000;
            return;
        }
        this._super(dt);
    },

    absorbing: function(collide){
        if(collide.obj.isParticle || collide.obj.isA("Kirby") ) return;
        
        collide.obj.p.isStatue = true;

        const direction = this.p.flip === "x" ? 1 : -1;
        const ix = this.p.x + direction * this.sheet().w / 2;
        collide.obj.p.vx = ix - collide.obj.p.x;
    },

    // Update Step
    step: function(dt){
        if(this.onScreen){
            this.trigger("cplay", "absorb");
            var kirby = Q("Kirby").first();
            this.p.x = kirby.p.x + (50) * (kirby.p.direction === "left" ? -1 : 1);
            this.p.y = kirby.p.y;

            this.p.skipCollision = true;
            this.p.gravity = false;
            this.p.flip = kirby.p.flip;
        }
    },

});





