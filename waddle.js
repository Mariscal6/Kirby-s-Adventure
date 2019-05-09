/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle1.png",
    "json_path": "waddle.json"
});

/* Animations */
Q.animations("waddle", {
    idle: {
        frames: [0,1],
        rate: 1/ 3,
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    die:{
        frames: [2,3,4],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    },
    attack:{
        frames: [1],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */

const WADDLE_STATE = {
    IDLE: 0,
    ATTACK: 1,
    DIE: -1,
};

Q.Sprite.extend("Waddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "waddle",
            isStatue: false,
            skipCollision: false,
            gravity: 1,
        });
        this.state = WADDLE_STATE.IDLE;

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
                this.attackTime=0;
                if(collision.obj.state === KIRBY_STATE.SLIDING ){
                    this.trigger("change_state", WADDLE_STATE.DIE);
                }
                else{
                    //bajar la vida del kirby
                //this.p.vy=-500;
                //this.p.direction = (this.p.direction === "left") ? "right" : "left";
                this.trigger("change_state", WADDLE_STATE.DIE);
                
                }
               
            }
        });

    },
    attack: function(){
        //this.isStatue = true;
       
        var stage=Q.stage(0);
        var fire = stage.insert(new Q.FireWaddle({
            y:this.p.y,
            x:this.p.x,
            vx:this.p.vx,
            direction:this.direction
         }));
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
            this.trigger("change_state", WADDLE_STATE.ATTACK);
        }
        switch(this.state){
            case WADDLE_STATE.IDLE:
                
                this.p.vx = 30 * (this.p.direction === "left" ? -1 : 1);
                this.trigger("cplay", "idle");

            break;

            case  WADDLE_STATE.DIE:
                this.trigger("cplay", "die");
                this.p.isStatue = true;
                this.gravity=false;
                this.p.vx=0;
                this.dieTime+=dt;
                if(this.dieTime>=0.15){
                    this.destroy();
                }
            break;

            case WADDLE_STATE.ATTACK:
                this.endAttackTime += dt;
                this.velAttack=this.p.vx;
                if(this.firstAttack){
                    this.trigger("cplay", "attack");
                    this.firstAttack=false;
                    this.attack();
                }
                if(this.endAttackTime>3){
                    this.trigger("change_state", WADDLE_STATE.IDLE);
                    //this.isStatue=false;
                    this.p.vx=this.velAttack;
                    console.log(this.velAttack);
                    this.endAttackTime = 0;
                    this.attackTime=0;
                    this.firstAttack=true;
                }
                
                break;
             

        }

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});





