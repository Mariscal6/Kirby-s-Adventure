/* Animations */
Q.animations("BossMissile", {
    missile:{
        frames: [0, 1],
        rate: 1/10,
    },
});

Q.Sprite.extend("BossMissile", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "boss_missile_sound",
            sprite: "BossMissile",
            skipCollision: true,
            gravity: false,
        });

        this.add("Entity, Particle");
        this.killPlayer = true;
        this.max_life = 1.0;

        this.id = p;
    },
  
    respawn: function(entity){
        this.onScreen = true;
        
        const an = (Math.PI / 4) / 3 * this.id;
        
        this.p.life = 0.0;
        this.p.x = entity.p.x;
        this.p.y = entity.p.y;
        const dir = Math.sign(Q("Kirby").first().p.x - this.p.x);
        this.p.vx = dir * Math.cos(an) * 200;
        this.p.vy = dir * Math.sin(an) * 200;
        //this.p.flip = entity.p.flip;
    },

    step: function(dt){
        this.play("missile");
    }

});