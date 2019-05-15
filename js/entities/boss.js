/* Load Sprite */
compiling.sheet.push({
    "png_path": "boss.png",
    "json_path": "boss.json"
});

/* Animations */
Q.animations("hotHead", {
    idle: {
        frames: [0,1],
        rate: 1/ 3,
        sheet:"bossWalk",
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    die:{
        frames: [0,1],
        rate:1 / 10,
        sheet:"bossDie",
        collision_box: {
            width: 38,
            height: 32,
        },
    },
    attack:{
        frames: [0,1],
        rate:1 / 10,
        sheet: "bossAttack",
        collision_box: {
            width: 38,
            height: 32,
        },
    },
    jump:{
        frames: [0,1],
        rate:1 / 10,
        sheet: "bossJump",
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */

const BOSS_STATE = {
    IDLE: 0,
    ATTACK: 1,
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
        this.lifes=3;
        this.state = BOSS_STATE.IDLE;

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
                if(collision.obj.state === KIRBY_STATE.SLIDING && this.lifes <= 1 ){
                    this.trigger("change_state", BOSS_STATE.DIE);
                }
                else if(collision.obj.state === KIRBY_STATE.SLIDING && this.lifes > 1){
                    this.lifes--;
                }
                else if(!this.skipCollision){Q.state.set("bar", Q.state.get("bar") - 1);}
            }
            if(collision.obj.isA("FireHotHead")){
                this.p.flip=this.flipActual;
            }
        });

    },
    attack: function(){
        //this.isStatue = true;

        var stage=Q.stage(0);
        var fire = stage.insert(new Q.HitBoss({
                    y:this.p.y,
                    x:this.p.x,
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
            this.trigger("change_state", BOSS_STATE.ATTACK);
        }
        switch(this.state){
            case BOSS_STATE.IDLE:
                if(this.p.vx!==0){
                    this.p.direction = (this.p.vx > 0) ? "right" : "left";
                }
                this.p.vx = 120*((this.p.direction === "left") ? -1 : 1);
                this.trigger("cplay", "idle");

                break;

            case  BOSS_STATE.DIE:

                this.trigger("cplay", "die");
                this.skipCollision = true,
                this.p.isStatue = true;
                this.gravity=false;
                this.p.vx=0;
                this.dieTime+=dt;
                if(this.dieTime>=0.15){
                    this.destroy();
                }
                break;

            case BOSS_STATE.ATTACK:
                this.endAttackTime += dt;
                
                if(this.firstAttack){
                    this.flipActual=this.p.flip;
                    this.trigger("cplay", "attack");
                    this.firstAttack=false;
                    this.attack();
                    this.p.vx=0;
                }
             
                if(this.endAttackTime>3){
                    this.trigger("change_state", BOSS_STATE.IDLE);
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





