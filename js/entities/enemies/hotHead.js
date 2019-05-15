/* Load Sprite */
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});

/* Animations */
Q.animations("hotHead", {
    idle: {
        frames: [0,1],
        rate: 1/3,
        sheet: "hotHead",
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die:{
        frames: [0,1],
        rate:1/10,
        sheet: "attack",
        collision_box: {
            width: 32,
            height: 32,
        },
    },
    attackWait:{
        frames: [0,1],
        rate:1 / 10,
        sheet: "attack",
        collision_box: {
            width: 32,
            height: 32,
        },
    },
    attackAction:{
        frames: [2,3],
        rate:1 / 10,
        sheet: "attack",
        collision_box: {
            width: 32,
            height: 32,
        },
    }
});

/* Object */

const HOTHEAD_STATE = {
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

        this.state = HOTHEAD_STATE.IDLE;

        // primer ataque
        this.firstAttack = true;
        this.terminateAttack = false;
        this.flipActual = false;

        //times
        this.dieTime = 0;
        this.idleTime = 0;
        this.endAttackTime = 0;

        this.add("Enemy");

        /* Events */
        this.on("attack", this, "attack");
        this.on("bump", this, "collision");

    },

    collision: function(collision){
        const entity = collision.obj;
        
        if(entity.isA("Kirby")){
            if(!this.skipCollision && entity.state !== KIRBY_STATE.SLIDING){ 
                Q.state.set("bar", Q.state.get("bar") - 1);
            }

            this.trigger("change_state", HOTHEAD_STATE.DIE);
        }
    },

    attack: function(){
        //this.isStatue = true;
        var stage = Q.stage(0);
        var fire = stage.insert(new Q.FireHotHead({
            y: this.p.y,
            x: this.p.x + (32 + 32) / 2 * (this.p.direction === "Left" ? -1 : 1),
            vx: this.p.vx,
            direction: this.p.direction
        }));
    },
        
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){

        switch(this.state){
            case HOTHEAD_STATE.IDLE:

            //console.log(this.p);
                this.p.vx = 80 * ((this.p.direction === "left") ? -1 : 1);
                this.trigger("cplay", "idle");

                this.idleTime += dt;
                if(this.idleTime >= 5){
                    this.trigger("change_state", HOTHEAD_STATE.ATTACK);
                }

            break;

            case  HOTHEAD_STATE.DIE:

                this.trigger("cplay", "die");
                this.skipCollision = true,
                this.p.isStatue = true;
                this.gravity = false;
                this.p.vx = 0;

                this.dieTime += dt;
                if(this.dieTime >= 2/10){
                    this.destroy();
                }

            break;

            case HOTHEAD_STATE.ATTACK:

                this.endAttackTime += dt;
                this.p.vx = 0;
                if(this.attackTime > 6){
                    if(this.firstAttack){
                        this.flipActual=this.p.flip;
                        this.trigger("cplay", "attackAction");
                        this.firstAttack=false;
                        //this.attack();
                    }
                
                    if(this.endAttackTime > 3){
                        this.trigger("change_state", HOTHEAD_STATE.IDLE);
                        this.endAttackTime = 0;
                        this.attackTime = 0;
                        this.firstAttack=true;
                    }
                }
                else{
                    this.trigger("cplay", "attackWait");
                }
                
            break;
             
        }
        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? false : "x";
        },
});





