
/* Animations */
Q.animations("bossHit", {
    fire:{
        frames: [1,2],
        rate:1 / 10,
        collision_box: {
            width: 70,
            height: 72,
        },
    },
});

/* estados */
const FIREHOTHEAD_STATE = {
    IDLE: 0,
    DIE: -1,
};

Q.Sprite.extend("BossHit", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "bossHit",
            sprite: "bossHit",
            frame: 4,
            isStatue: false,
            skipCollision: true,
            gravity: false,
            vx:0,

        });

        //times
        this.state=BOSSHIT_STATE.IDLE;
        this.fireTime = 0;
        this.touch=false;
        this.terminate=false;

        this.add("Entity, aiBounce");

        /* Events */
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){

            if(!collision.obj.isA("Kirby")){
                this.p.flip = (this.p.direction === "left") ? "x" : false;
            }
            if(collision.obj.isA("Kirby")){
                //KIRBY PIERDE VIDA
            }
 
        });

    },
  
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        if(this.touch) return
        this.p.vx=0;
        if(this.fireTime > 3){
            this.trigger("change_state", BOSSHIT_STATE.DIE);
        }
        switch(this.state){
            case BOSSHIT_STATE.DIE:
                this.terminate=true;
                this.fireTime = 0;
                this.destroy();
            break;
            case BOSSHIT_STATE.IDLE:
                this.fireTime += dt;
            break;
        }
        
    },

});





