// ----------------- Particle

Q.component("Particle", {
    //Hill
    added: function(){
        this.entity.add("animation, 2d");

        this.entity.life = 0;
        this.entity.max_life = 0;
        this.entity.onScreen = false;
        this.entity.isParticle = true;
        
        //this.entity.on("respawn", this.entity, "respawn");
        this.entity.on("respawn", this.entity, "respawn");
        this.entity.on("step", this, "step");

        this.entity.on("die", this, "die");
        //this.entity.on("update", this, "update");
    },

    die: function(){
        const entity = this.entity;
        entity.onScreen = false;
        entity.life = 0;

        entity.p.vx = 0;
        entity.p.vy = 0;
        entity.p.x = -1000;
        entity.p.y = -1000;
    },
    step: function(dt){
        const entity = this.entity;
        if(!this.entity.onScreen) return;

        entity.life += dt;
        if(entity.life > entity.max_life){
            entity.trigger("die");
        }
    }
});