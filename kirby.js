// ----------------- Kirby

/* Load Sound */
/*compiling.audio.push({
    "kirby_run": "./run_kirby.mp3",
    "kirby_dance": "./kirby_dance.mp3"
});*/

/* Load Sprite */
compiling.sheet.push({
    "png_path": "kirby.png",
    "json_path": "sprites.json"
});

/* Animations */
Q.animations("kirby", {
    idle: {
        frames: [0],
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    blink: {
        frames: [1],
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    move: {
        frames: [4, 3, 2], 
        rate:1 / 10,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    /* ABSORBING */
    start_absorbing: {
        frames: [12],
        rate: 1 / 8,
        collision_box: {
            width: 30,
            height: 30
        },
    },
    
    absorbing: {
        frames: [14],
        collision_box: {
            width: 30,
            height: 40
        },
    },

    /* SPIN */
    spin: {
        frames: [7, 8, 9, 0],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },

    /* FALLING */
    falling_head: {
        frames: [8],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    falling: {
        frames: [11],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    bouncing_head:{
        rames: [8],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },


    /*JUMPING */
    jumping: {
        frames: [7],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    
    /* FLYING */
    flying: {
        frames: [13, 14, 21, 22, 23],
        rate: 1/6,
        collision_box: {
            width: 30,
            height: 30
        }
    },
    flying_static_down:{
        frames: [22, 23],
        rate: 1/3,
        collision_box: {
            width: 44,
            height: 44
        }
    },
    flying_static_up:{
        frames: [22, 23],
        rate: 1/8,
        collision_box: {
            width: 44,
            height: 44
        }
    },
});

/* Object */

const KIRBY_STATE = {
    IDLE: 0,
    MOVING: 1,
    HIGHJUMP: 2,
    BALLOON: 3,
    ABSORB: 4,
    SKID: 5,
    FALLING:6,
    BOUNCING:7,
    DIE: -1,
};

const ABSORB_TYPE = {
    ABSORBING: 0,
    BLOWING: -1
};

Q.Sprite.extend("Kirby", {

    init: function(p){

        this._super(p, {
            sheet: "kirby",
            sprite: "kirby",
            x: 100,
            y: 100,
            isStatue: false
        });

        this.state = KIRBY_STATE.IDLE;
        this.flying_constant = false;
        this.last_animation = "";
        this.last_state = null;

        // idle
        this.blinkTime = 0;

        // Falling
        this.fallingSpeed = 0;

        // Bouncing
        this.bounces = 0;
        
        // Absorbing
        this.absorbTime = 0;
        this.absorbType = null;

        this.add("platformerControls, Entity");

        /* Events */
        this.on("attack", this, "attack");
        this.on("attack_end", this, "attack_end");

        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");
    },

    /* ATTACK */
    attack: function(){
        if(this.absorbTime > 0) return;


        switch(this.state){
            case KIRBY_STATE.BALLOON:
                this.trigger("change_state", KIRBY_STATE.IDLE);
            break;
            default:
                this.absorbTime = 0;
                this.p.isStatue = true;
                this.p.vx = 0.0;
                this.absorbType = ABSORB_TYPE.ABSORBING;
                this.trigger("change_state", KIRBY_STATE.ABSORB);
            break;
        };
        
    },

    attack_end: function(){

        this.absorbTime = 0;
        this.absorbType = ABSORB_TYPE.BLOWING;

    },

    /* END ATTACK */
    highJump: function(){
        this.trigger("change_state", KIRBY_STATE.HIGHJUMP);
        this.p.gravity = 0.5;
    },

    balloon: function(){
        // Si somos estatua, no nos debe dejar.
        if(this.p.isStatue) return;

        this.trigger("change_state", KIRBY_STATE.BALLOON);
        this.p.vy = -220;
        this.p.gravity = 0.5;
    },

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){

        switch(this.state){
            case KIRBY_STATE.IDLE:

                if (this.p.vy > 0 || this.last_state == KIRBY_STATE.BALLOON){
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }else{
                    this.blinkTime = (this.blinkTime + 1) % 100;
                    this.trigger("cplay", ((this.blinkTime >= 70) && (this.blinkTime % 15) < 10)  ? "blink" : "idle");
                
                    // Transition if the lenght of the x velocity is greater than 0 (is moving).
                    this.trigger("change_state", Math.abs(this.p.vx) > 0.1 ? KIRBY_STATE.MOVING : KIRBY_STATE.IDLE);
                }

            break;

            case KIRBY_STATE.MOVING:

                if (this.p.vy > 0){
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }else{
                    this.trigger("cplay", "move");
                    this.blinkTime = 0;
                    // Transition if the lenght of the x velocity is 0 (stop moving).
                    this.trigger("change_state", Math.abs(this.p.vx) < 0.1 ? KIRBY_STATE.IDLE : KIRBY_STATE.MOVING);
                }

            break;
            
            case KIRBY_STATE.ABSORB:
                
                this.absorbTime += dt;
                
                if(this.absorbType == ABSORB_TYPE.ABSORBING){
                    if(this.absorbTime < 1 / 8){
                        this.trigger("cplay", "start_absorbing");
                    }else{
                        this.trigger("cplay", "absorbing");
                    }
                }else{
                    if(this.absorbTime < 1 / 8){
                        this.trigger("cplay", "start_absorbing");
                    }else{
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                        this.p.isStatue = false;
                        this.absorbTime = 0;
                    }
                }

            break;

            case KIRBY_STATE.BALLOON:
                
                if(this.p.vy >= 0 || this.flying_constant){
                    this.flying_constant = true;
                    this.trigger("cplay", this.p.vy < 0 ? "flying_static_up" : "flying_static_down");
                }else{
                    this.flying_constant = false;
                    this.trigger("cplay", "flying");
                }

            break;
            case KIRBY_STATE.HIGHJUMP:
                // TO DO: Crear estado "falling head"
                if (Math.abs(this.p.vy) < 50) {
                    this.trigger("cplay", "spin");
                } else if (this.p.vy < -50) {
                    this.trigger("cplay", "jumping");
                } else {
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }
            break;

            case KIRBY_STATE.FALLING:

                if (Math.abs(this.p.vy) < 0.01) {
                    if (this.fallingSpeed >= 400) {
                        this.trigger("change_state", KIRBY_STATE.BOUNCING);
                    } else {
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                    }
                } else if (this.p.vy > 1 && this.p.vy < 120) {
                    this.trigger("cplay", "falling");
                } else if (this.p.vy >= 400) {
                    this.trigger("cplay", "falling_head");
                }
                this.fallingSpeed = this.p.vy;

            break;
            case KIRBY_STATE.BOUNCING:

                this.fallingSpeed = 0;
                if(Math.abs(this.p.vy) < 0.01){
                    // First Bounce
                    if (this.bounces++ == 0) {
                        this.p.vy = -150;
                        this.trigger("cplay", "falling_head");
                    }else{ // Last Bounce
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                        this.bounces = 0;
                    }
                }


            break;
        }
        
        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});


