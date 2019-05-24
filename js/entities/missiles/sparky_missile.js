// ----------------- Sparky Missile

Q.Sprite.extend("SparkyMissile", {
    
    init: function(p){
        
        this._super(p, {
            sheet: "sparky_missile",
            skipCollision: true,
            gravity: false,
        });

        this.add("Entity, Particle");
        this.isEntity = false;
        this.killPlayer = true;
    },
  
    respawn: function(entity, life = 0.1){
        this.onScreen = true;
        this.max_life = life;
        this.life = 0.0;
        const angle = Math.random() * Math.PI * 2;
        const radius = 32;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        this.p.x = entity.p.x + dx * radius;
        this.p.y = entity.p.y + dy * radius;
        this.p.vx = dx * radius;
        this.p.vy = dy * radius;
    },

});