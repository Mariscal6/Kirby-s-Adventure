compiling.sheet.push({
    "png_path": "fireHotHead.png",
    "json_path": "fireHotHead.json"
});

/* Animations */
Q.animations("fireHotHead", {
    fire:{
        frames: [1,2,3],
        rate:1 / 10,
        collision_box: {
            width: 96,
            height: 64,
        },
    },
});

/* estados */
const FIREHOTHEAD_STATE = {
    IDLE: 0,
    DIE: -1,
};

Q.Sprite.extend("FireHotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "fireHotHead",
            sprite: "fireHotHead",
            frame: 4,
            isStatue: false,
            skipCollision: true,
            gravity: false,

        });

        //times
        this.state=FIREHOTHEAD_STATE.IDLE;
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
               this.trigger("change_state", FIREHOTHEAD_STATE.DIE);
            }
            else if(collision.obj.isA("Hill")){
                this.trigger("change_state", FIREHOTHEAD_STATE.DIE);
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
            this.trigger("change_state", FIREHOTHEAD_STATE.DIE);
        }
        switch(this.state){
            case FIREHOTHEAD_STATE.DIE:
                this.terminate=true;
                this.fireTime = 0;
                this.destroy();
            break;
            case FIREHOTHEAD_STATE.IDLE:
                this.fireTime += dt;
            break;
        }
        
    },

});





