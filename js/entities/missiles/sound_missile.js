/* Animations */
Q.Sprite.extend("SoundEnemy", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "boss_missile_note",
            gravity: false,
        });

        this.add("Entity, Particle");
        this.p.points = [[-16, -16], [-16, +16], [+16, +16], [+16, -16]];
        
        const an = (Math.PI / 2) / 5 * this.id;
        
        
        const dx = Math.cos(p.angle), dy = Math.sin(p.angle);
        this.p.x = p.self.p.x + dx * 50;
        this.p.y = p.self.p.y + dy * 50;
        this.p.vx = dx * 200;
        this.p.vy = dy * 200;

        this.isEnemy = true;
        this.onScreen = true;
        this.killPlayer = true;
        this.max_life = Number.MAX_SAFE_INTEGER;
        this.life = 0.0;
    },
    
    respawn: function(angle){},

    step: function(dt){
        if(Math.sqrt(this.p.vx * this.p.vx + this.p.vy * this.p.vy) < 0.01){
            this.destroy();
        }
    }
});





