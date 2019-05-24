// ----------------- Waddle Doo Missile

Q.Sprite.extend("WaddleDooMissile", {
    
    init: function(p){
        
        this._super(p, {
            sheet: "waddle_doo_missile",
            skipCollision: true,
            gravity: false,
        });

        this.add("Entity, Particle");

        this.p.points = [[-8, -8], [-8, +8], [+8, +8], [+8, -8]];

        this.isEntity = false;
        this.killPlayer = true;
        this.max_life = Number.MAX_SAFE_INTEGER;
        this.parent = null;
        this.index = p;
    },
  
    respawn: function(entity){
        this.onScreen = true;

        this.max_life = entity.attack_duration;
        this.life = 0.0;
        this.parent = entity;
    },

    step: function(dt){
        if(!this.parent || !this.onScreen) return;

        const dir = this.parent.p.direction === "left" ? -1 : 1;
        const angle_map = Math.PI / 2 + dir * (Math.PI / 2) / this.max_life * this.life;
        this.p.x = this.parent.p.x - Math.cos(angle_map) * (24 * (1 + this.index));
        this.p.y = this.parent.p.y - Math.sin(angle_map) * (24 * (1 + this.index));
    }

});