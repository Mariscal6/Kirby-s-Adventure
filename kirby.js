// ----------------- Kirby

/* Load Sound */
/*compiling.audio.push({
    "kirby_run": "./run_kirby.mp3",
    "kirby_dance": "./kirby_dance.mp3"
});*/

/* Load Sprite */
compiling.sheet.push({
    "png_path": "kirby.png",
    //"path_powers": "powersHUD.png",
    "json_path": "sprites.json"
});

/* Constants */
const INITIAL_SPEED = 130;
const MAX_SPEED = 200;
const BALLOON_MAX_SPEED_Y = 60;
const BALLOON_MAX_SPEED_X = 160;

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
        frames: [13, 14, 21, 22],
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

    /* BLOWING */

    start_blowing:{
        frames: [21],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    blowing1:{
        frames: [14],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    blowing2:{
        frames: [13],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    /* SKIDDING*/

    skidding: {
        frames: [10],
        rate: 1/6,
        collision_box: {
            width: 30,
            height: 30
        }
    },

    /*Bending*/

    bend: {
        frames: [5],
        rate: 1/6,
        collision_box: {
            width: 30,
            height: 20
        }
    },

    /*SLIDING*/

    slide: {
        frames: [6],
        rate: 1/6,
        collision_box: {
            width: 30,
            height: 20
        }
    },

});

/* Object */

const KIRBY_STATE = {
    IDLE: 0,
    MOVING: 1,
    HIGHJUMP: 2,
    BALLOONING: 3,
    ABSORBING: 4,
    BLOWING: 5,
    SKID: 6,
    FALLING: 7,
    BOUNCING: 8,
    HILLING: 9,
    BEND: 10,
    SLIDING: 11,
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
            isStatue: false,
        });


        this.state = KIRBY_STATE.IDLE;
        this.last_animation = "";
        this.last_state = null;

        // idle
        this.blinkTime = 0;

        // Falling
        this.fallingSpeed = 0;

        // MOVING
        this.movingSpeed = 0;
        this.skiddingTime = 0;
        this.last_direction=0;

        // Bouncing
        this.bounces = 0;
        
        // Absorbing
        this.absorbTime = 0;
        this.absorbType = null;

        // Blowing
        this.blowingTime = 0;

        // Flying
        this.flyingTime = 0;

        //SLIDING TIME
        this.slideTime=0;

        this.add("platformerControls, Entity");

        /* Events */
        this.on("attack", this, "attack");
        this.on("attack_end", this, "attack_end");

        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");

        this.on("bend", this, "bend");
        this.on("bend_end", this, "bend_end");

    },

    /* ATTACK */
    attack: function(){
        
        if(this.absorbTime > 0) return;

        this.flyingTime = 0;

        switch(this.state){
            case KIRBY_STATE.BALLOON:
                this.trigger("change_state", KIRBY_STATE.BLOWING);
            break;
            case KIRBY_STATE.BEND:
                this.trigger("change_state", KIRBY_STATE.SLIDING);
            break;
            case KIRBY_STATE.SLIDING:
            break;
            default:
                this.p.isStatue = true;
                this.absorbType = ABSORB_TYPE.ABSORBING;
                this.trigger("change_state", KIRBY_STATE.ABSORBING);
            break;
        };
        
    },

    attack_end: function(){

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

    /*BEND*/

    bend: function(){
        // Si somos estatua, no nos debe dejar.
        if(this.p.isStatue) return;
        switch (this.state) {
            case KIRBY_STATE.IDLE:
                this.trigger("change_state", KIRBY_STATE.BEND);
                this.p.gravity = 0.5;
                this.p.isStatue=true;
                this.p.vx=0;
                break;
            case KIRBY_STATE.MOVING:
                console.log(1);
                this.trigger("change_state", KIRBY_STATE.BEND);
                this.p.gravity = 0.5;
                this.p.isStatue=true;
                this.p.vx=0;
            break;
        };
        
    },

    bend_end: function () {

        if (this.state == KIRBY_STATE.BEND ) {
            this.trigger("change_state", KIRBY_STATE.IDLE);
            this.p.isStatue=false;
        }

    },


    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        this.p.gravity = 0.5; // Reset Gravity
        if(this.p.y <= 311){
            console.log(this.p.collisions);
        }
        
        switch(this.state){
            
            case KIRBY_STATE.IDLE:

                this.p.speed = INITIAL_SPEED; // Reset Speed to initial

                if (this.p.vy > 0 || this.last_state == KIRBY_STATE.BALLOON) {
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                } else {
                    this.blinkTime = dt; (this.blinkTime + 1) % 100;
                    this.trigger("cplay", ((this.blinkTime >= 70) && (this.blinkTime % 15) < 10) ? "blink" : "idle");

                    // Transition if the lenght of the x velocity is greater than 0 (is moving or skid).
                    if (Math.abs(this.p.vx) > 0.1) {
                        this.trigger("change_state", KIRBY_STATE.MOVING);
                    } else {
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                    }
                }
                this.movingSpeed = this.p.speed;
                
            break;
            case KIRBY_STATE.MOVING:

                this.movingSpeed = this.p.speed;
                this.p.speed = Math.min(this.p.speed * 1.02, MAX_SPEED); // Add speed until maximum

                if (this.p.vy > 0){
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }else{
                    if (Math.abs(this.movingSpeed) >= MAX_SPEED && this.last_direction != this.p.direction) {
                        this.trigger("change_state", KIRBY_STATE.SKID);
                    } else {
                        this.trigger("cplay", "move");
                        // Transition if the lenght of the x velocity is 0 (stop moving).
                        this.trigger("change_state", Math.abs(this.p.vx) < 0.1 ? KIRBY_STATE.IDLE : KIRBY_STATE.MOVING);
                    }                    
                }
                this.last_direction = this.p.direction;

            break;
            case KIRBY_STATE.ABSORBING:
                
                this.absorbTime += dt;
                
                if(this.absorbType == ABSORB_TYPE.ABSORBING){
                    this.p.vx = 0;
                    if(this.absorbTime < 1/8){
                        this.trigger("cplay", "start_absorbing");
                    }else{
                        this.trigger("cplay", "absorbing");
                    }
                }else{
                    if(this.absorbTime < 1/8){
                        this.trigger("cplay", "start_absorbing");
                    }else{
                        this.absorbTime = 0;
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                        this.p.isStatue = false;
                    }
                }

            break;

            case KIRBY_STATE.BLOWING:
                this.p.vy = Math.min(this.p.vy, BALLOON_MAX_SPEED_Y);
                this.blowingTime += dt;

                if (this.blowingTime < 1 / 8) {

                    this.trigger("cplay", "start_blowing");

                } else if (this.blowingTime < 2 / 8) {
                    
                    this.trigger("cplay", "blowing1");

                } else if (this.blowingTime < 3 / 8) {

                    this.trigger("cplay", "blowing2");

                } else {

                    this.blowingTime = 0;
                    this.trigger("cplay", "falling");
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                    
                }

            break;

            case KIRBY_STATE.BALLOON:
                this.p.vy = Math.min(this.p.vy, BALLOON_MAX_SPEED_Y);
                this.flyingTime += dt;
                if(this.flyingTime < 4/6){
                    this.flying_constant = false;
                    this.trigger("cplay", "flying");
                }else{
                    this.trigger("cplay", this.p.vy < 0 ? "flying_static_up" : "flying_static_down");
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

                this.p.isStatue = true;
                this.fallingSpeed = 0;
                if(Math.abs(this.p.vy) < 0.01){
                    // First Bounce
                    if (this.bounces++ === 0) {
                        this.p.vy = -150;
                        this.trigger("cplay", "falling_head");
                    }else{ // Last Bounce
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                        this.p.isStatue = false;
                        this.bounces = 0;
                    }
                }

            break;
            case KIRBY_STATE.SKID:

                this.p.isStatue = true;
                this.fallingSpeed = 0;
                this.skiddingTime += dt;
                if(this.skiddingTime <= 1/6){
                    this.p.speed *= 0.98;
                    this.p.direction = (this.p.vx < 0) ? "right" : "left";        
                    this.trigger("cplay", "skidding");
                }else{
                    this.skiddingTime = 0;
                    this.p.direction = (this.p.direction === "left") ? "right" : "left";
                    this.trigger("change_state", KIRBY_STATE.MOVING);
                    this.p.speed = INITIAL_SPEED;
                    this.p.isStatue = false;
                }
            break;
            case KIRBY_STATE.HILLING:

                /*if(this.p.vy < 0){
                    this.p.speed = INITIAL_SPEED-50;
                } else {
                    this.p.speed = INITIAL_SPEED + 50;
                }
               // Reset Speed to initial*/
                this.trigger("cplay", "move");
                //this.trigger("change_state", KIRBY_STATE.IDLE);
                
            break;

            case KIRBY_STATE.BEND:
                this.trigger("cplay", "bend");
                //this.trigger("change_state", KIRBY_STATE.IDLE);

            break;

            case KIRBY_STATE.SLIDING:

                this.slideTime+=dt;
                if (this.slideTime < 0.5) {

                    this.p.vx = (this.p.direction === "left") ? -MAX_SPEED : MAX_SPEED;
                    this.trigger("cplay", "slide");

                } else {
                    this.p.vx=0;
                    this.slideTime = 0;
                    this.trigger("change_state", KIRBY_STATE.BEND);
                    this.bend_end();

                }
                

            break;
        }
        
        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});





