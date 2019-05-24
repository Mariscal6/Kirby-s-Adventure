/* Animations */
Q.animations("SoundMissile", {
    missile:{
        frames: [0],
        collision_box: {
            width: 16,
            height: 16,
        }
    },
});

/* Animations */
Q.Sprite.extend("SoundEnemy", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "boss_missile_note",
            sprite: "SoundMissile",
            skipCollision: true,
            gravity: false,
        });

        this.add("Enemy");
        this.max_life = 1.0;
        
        this.angle = p;
        
        const an = (Math.PI / 2) / 5 * this.id;
        
        console.log(p);
        this.p.x = p.self.p.x;
        this.p.y = p.self.p.y;
        this.p.vx = Math.cos(p.self.angle) * 200;
        this.p.vy = Math.sin(p.self.angle) * 200;
    },

    step: function(dt){
        this.play("missile");

        if(Math.sqrt(this.p.vx * this.p.vx + this.p.vy * this.p.vy) < 0.01){
            this.destroy();
        }
    }
});





