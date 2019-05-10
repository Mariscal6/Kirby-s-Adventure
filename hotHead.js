/* Load Sprite */
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});

/* Animations */
Q.animations("hotHead", {
    idle: {
        frames: [0,1],
        rate: 1/ 3,
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    die:{
        frames: [2,3],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    },
    attack:{
        frames: [2,3],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */

const HOTHEAD_STATE = {
    IDLE: 0,
    ATTACK: 2,
    DIE: -1,
};

Q.Sprite.extend("HotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "hotHead",
            sprite: "hotHead",
            isStatue: false,
            direction: "left",
            skipCollision: false,
            gravity: 1,
        });
        this.state = HOTHEAD_STATE.IDLE;

        // primer ataque
        this.firstAttack=true;
        this.terminateAttack=false;
        this.flipActual=false;
        //times
        this.dieTime = 0;
        this.attackTime=0;
        this.endAttackTime=0;

        this.add("Entity, aiBounce");

        /* Events */
        this.on("attack", this, "attack");
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){
            if(collision.obj.isA("Kirby")){
                this.attackTime=0;
                if(collision.obj.state === KIRBY_STATE.SLIDING ){
                    this.trigger("change_state", HOTHEAD_STATE.DIE);
                }
                else{
                    //bajar la vida del kirby
                //this.p.vy=-500;
                //this.p.direction = (this.p.direction === "left") ? "right" : "left";
                this.trigger("change_state", HOTHEAD_STATE.DIE);
                } 
            }
            if(collision.obj.isA("FireHotHead")){
                this.p.flip=this.flipActual;
            }
        });

    },
    attack: function(){
        //this.isStatue = true;

        var stage=Q.stage(0);
        var fire = stage.insert(new Q.FireHotHead({
                    y:this.p.y,
                    x:this.p.x,
                    vx:this.p.vx,
                    direction:this.p.direction
            }));
    },
        
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        this.attackTime += dt;
        if(this.attackTime>=5){
            this.trigger("change_state", HOTHEAD_STATE.ATTACK);
        }
        switch(this.state){
            case HOTHEAD_STATE.IDLE:
                if(this.p.vx!==0){
                    this.p.direction = (this.p.vx > 0) ? "right" : "left";
                }
                this.p.vx = 80*((this.p.direction === "left") ? -1 : 1);
                this.trigger("cplay", "idle");

                break;

            case  HOTHEAD_STATE.DIE:

                this.trigger("cplay", "die");
                this.p.isStatue = true;
                this.gravity=false;
                this.p.vx=0;
                this.dieTime+=dt;
                if(this.dieTime>=0.15){
                    this.destroy();
                }
                break;

            case HOTHEAD_STATE.ATTACK:
                this.endAttackTime += dt;
                
                if(this.firstAttack){
                    this.flipActual=this.p.flip;
                    this.trigger("cplay", "attack");
                    this.firstAttack=false;
                    this.attack();
                    this.p.vx=0;
                }
             
                if(this.endAttackTime>3){
                    this.trigger("change_state", HOTHEAD_STATE.IDLE);
                    this.endAttackTime = 0;
                    this.attackTime=0;
                    this.firstAttack=true;
                }
                
                break;
             
        }
        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? false : "x";
        },
});





