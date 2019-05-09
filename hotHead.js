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
        flip: false, 
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    idleR: {
        frames: [0,1],
        rate:1 / 3,
        flip: "x", 
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
        frames: [2],
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
    IDLER: 1,
    ATTACK: 2,
    DIE: -1,
};

Q.Sprite.extend("HotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "hotHead",
            sprite: "hotHead",
            isStatue: false,
            vx: 30,
            direction: "left",
            flip: "x",
            skipCollision: false,
            gravity: 1,

        });
        this.state = HOTHEAD_STATE.IDLE;

        // primer ataque
        this.firstAttack=true;
        this.terminateAttack=false;
        this.velAttack=0;
        //times
        this.dieTime = 0;
        this.attackTime=0;
        this.endAttackTime=0;

        this.add("Entity, aiBounce");

        /* Events */
        this.on("attack", this, "attack");
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){
            if(collision.obj.isA("Kirby")){
                if(collision.obj.state === KIRBY_STATE.SLIDING ){
                    this.attackTime=0;
                    this.trigger("change_state", HOTHEAD_STATE.DIE);
                }
                else{
                    //bajar la vida del kirby
                //this.p.vy=-500;
                //this.p.direction = (this.p.direction === "left") ? "right" : "left";
                }
                this.trigger("change_state", HOTHEAD_STATE.DIE);
            }
        });

    },
    attack: function(){
        //this.isStatue = true;
       // var stage=Q.stage(0);
        /*var fire = stage.insert(new Q.FireHotHead({
                    y:this.p.y,
                    x:this.p.x,
                    vx:this.p.vx,
                    direction:this.direction
         }));*/
         this.p.vx=0;
        

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
                this.p.direction = (this.p.vx > 0) ? "right" : "left";
                if(this.p.direction === "left"){
                    this.p.flip = "x";
                    this.p.vx = -30;
                    this.trigger("cplay", "idle");
                }else{
                    this.p.flip = false;
                    this.p.vx = 30;
                    this.trigger("cplay", "idleR");
                }
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
                this.velAttack=this.p.vx;
                if(this.firstAttack){
                    this.trigger("cplay", "attack");
                    this.firstAttack=false;
                    this.attack();
                }
                if(this.endAttackTime>3){
                    this.trigger("change_state", HOTHEAD_STATE.IDLE);
                    //this.isStatue=false;
                    this.p.vx=this.velAttack;
                    console.log(this.velAttack);
                    this.endAttackTime = 0;
                    this.attackTime=0;
                    this.firstAttack=true;
                }
                
                break;
             

        }
    },
});





