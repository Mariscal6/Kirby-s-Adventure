// ----------------- Enemy

const ENEMY_STATE = {
    DIE: -1,
    IDLE: 0,
    ATTACKING: 1,
    ABSORBED: 2,
};

Q.component("Enemy", {
    //Hill
   added: function(){
       this.entity.add("Entity, aiBounce");

       this.entity.on("step", this, "step");
       this.entity.on("bump", this, "collision");

       // Global events
       this.entity.on("attack", this.entity, "attack");

       // States
       this.entity.state = ENEMY_STATE.IDLE;

       this.entity.timeIdle = 0.0;
   },

   collision: function(collision){

       if(collision.obj.isA("TileLayer")) return;

       /*
        if(collision.obj.isA("Kirby")){

            this.attackTime=0;
            if(collision.obj.state === KIRBY_STATE.SLIDING ){
                this.trigger("change_state", WADDLE_STATE.DIE);
            }
            else{
                if(!this.skipCollision){Q.state.set("bar", Q.state.get("bar") - 1);}
                this.trigger("change_state", WADDLE_STATE.DIE);
            }
        }
        if(collision.obj.isA("FireWaddle")){
            this.p.flip=this.flipActual;
        }
        */
    },

   step: function(dt){
        const self = this.entity;

        switch(self.state){
            case ENEMY_STATE.IDLE:
                self.trigger("cplay", "idle");

                self.p.direction = (self.p.vx >= 0) ? "right" : "left";

                self.p.vx = 40 * ((self.p.direction === "left") ? -1 : 1);

                self.timeIdle += dt;

                if(self.timeIdle >= 2.0){
                    self.trigger("change_state", ENEMY_STATE.ATTACKING);
                }
            break;
            case ENEMY_STATE.ATTACKING:

                self.trigger("attack");

            break;
            case ENEMY_STATE.ABSORBED:

            break;
            case ENEMY_STATE.DIE:
            
            break;
        }

        self.p.flip = (self.p.direction === "left") ? false : "x";

   }

});