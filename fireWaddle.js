
/* Animations */
Q.animations("fireWaddle", {
    fire:{
        frames: [4],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 22,
        },
    },
});

/* estados */
const FIREWADDLE_STATE = {
    IDLE: 0,
    DIE: -1,
};

Q.Sprite.extend("FireWaddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "fireWaddle",
            frame: 4,
            isStatue: false,
            skipCollision: true,
            gravity: false,

        });

        //times
        this.state=FIREWADDLE_STATE.IDLE;
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
               this.trigger("change_state", FIREWADDLE_STATE.DIE);
            }
            else if(collision.obj.isA("Hill")){
                this.trigger("change_state", FIREWADDLE_STATE.DIE);
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
        if(this.fireTime > 2.5){
            this.trigger("change_state", FIREWADDLE_STATE.DIE);
        }
        switch(this.state){
            case FIREWADDLE_STATE.DIE:
                this.terminate=true;
                this.fireTime = 0;
                this.destroy();
            break;
            case FIREWADDLE_STATE.IDLE:
                this.fireTime += dt;
            break;
        }
    },

});





