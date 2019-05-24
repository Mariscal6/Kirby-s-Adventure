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

/* Constants */
const INITIAL_SPEED = 130;
const INITIAL_CHUBBY_SPEED = 65;

const INVENCIBILITY_TIME = 2.0;

const MAX_SPEED = 200;
const MAX_CHUBBY_SPEED = 100;
const MAX_CHUBBY_RUNNING_SPEED = 200;
const MAX_RUNNING_SPEED = 300;

const BALLOON_MAX_SPEED_Y = 60;
const BALLOON_MAX_SPEED_X = 160;

/* Animations */
Q.animations("kirby", {
    /* Normal */
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
        rate: 1/10,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    running: {
        frames: [4, 3, 2], 
        rate: 1/20,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    hit: {
        frames: [7, 8, 9, 0],
        rate: 1 / 16,
        collision_box: {
            width: 30,
            height: 30,
        }
    },

    /* Chubby */
    chubby_idle: {
        frames: [15],
        collision_box: {
            width: 44,
            height: 44
        }
    },
    chubby_blink: {
        frames: [15],
        rate: 1/3,
        collision_box: {
            width: 44,
            height: 44
        }
    },
    chubby_move: {
        frames: [16, 17],
        rate: 1/3,
        collision_box: {
            width: 44,
            height: 44
        }
    },
    chubby_running: {
        frames: [16, 17], 
        rate: 1/9,
        collision_box: {
            width: 44,
            height: 44,
        }
    },
    chubby_hit: {
        frames: [24],
        rate: 1 / 16,
        collision_box: {
            width: 44,
            height: 44,
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

    start_blowing: {
        frames: [21],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    blowing1: {
        frames: [14],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    blowing2: {
        frames: [13],
        rate: 1/16,
        collision_box: {
            width: 44,
            height: 44
        }
    },

    star_blowing: {
        frames: [19, 20, 14],
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


    /*Byebye*/
    bye:{
        frames: [28, 27, 26, 25, 25, 25],
        rate: 1/16,
        collision_box: {
            width: 30,
            height: 30
        }
    },

     /*Fire*/
     fire_start:{
        frames: [31, 32, 31, 32],
        rate: 1/4,
        collision_box: {
            width: 30,
            height: 30
        }
    },
    fire_red:{
        frames: [29,29,29,29],
        rate: 1/4,
        collision_box: {
            width: 30,
            height: 30
        }
    },
    chubby_fire_red:{
        frames: [30],
        rate: 1/4,
        collision_box: {
            width: 30,
            height: 30
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
    BLOWING_STAR: 6,
    SKID: 7,
    FALLING: 8,
    BOUNCING: 9,
    HILLING: 10,
    BEND: 11,
    SLIDING: 12,
    HIT: 13,
    BYE: 14,
    FIRE: 15,
    DIE: -1,
};

const ABSORB_TYPE = {
    ABSORBING: 0,
    BLOWING: -1
};

const KIRBY_POWER = {
    FIRE: "fire",
    SPARKY: "sparky",
    NONE : "",
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
        this.killEnemy = true;

        // idle
        this.blinkTime = 0;

        // Falling
        this.fallingSpeed = 0;

        // MOVING
        this.movingSpeed = 0;
        this.skiddingTime = 0;
        this.last_direction = 0;

        // Bouncing
        this.bounces = 0;
        
        // Absorbing
        this.absorbTime = 0;
        this.absorbType = null;

        // Blowing
        this.blowingTime = 0;
        this.startTime = 0;

        // Flying
        this.flyingTime = 0;

        //SLIDING TIME
        this.slideTime = 0;

        // CHUBBY
        this.isChubby = false;

        // Running
        this.isRunning = false;

        // Attack
        this.isAttackSwitch = false;

        // Last climb
        this.wasClimbing = false;

        // Hit
        this.hitTime = 0.0;

        // bye 
        this.byeTime = 0;

        // invencible
        this.invencibleTime = 0;

        // Power
        this.isPowered = KIRBY_POWER.NONE;

        //Fire

        this.fireTime = 0;

        this.add("platformerControls, Entity");

        /* Events */
        this.on("attack", this, "attack");
        this.on("attack_end", this, "attack_end");

        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");

        this.on("bend", this, "bend");
        this.on("bend_end", this, "bend_end");

        this.on("bump", this, "collision");

        this.on("run", this, "run");
        
    },

    draw: function(ctx){
        ctx.save();
            const opacity = Math.abs(Math.sin(Math.max(0.0, this.invencibleTime) * (4 * 2 * Math.PI) / INVENCIBILITY_TIME)) * 0.3;
            ctx.globalAlpha = 1 - opacity;
            this._super(ctx);
        ctx.restore();
    },

    collision: function(collide){
        if(!collide.obj.isEntity || this.invencibleTime >= 0 || collide.obj.timeDead > 0) return;

        // If kirby collides with something while absorbing.
        // TODO: Check if the collision directions is the same as the absorbing direction
        if(
            //this.state === KIRBY_STATE.ABSORBING &&
            Q("AbsorbMissile").first().onScreen && collide.obj.isEnemy &&
            ((this.p.direction === "left" ? 1 : -1) === collide.normalX && collide.normalY === 0)
        ){
            this.isChubby = true;
            Q.inputs["attack"] = false; //attack_end
            this.isAttackSwitch = true;
            collide.obj.destroy();
            Q.state.inc("score",1000);
        }
        else{

            this.p.isStatue = true;
            decShield(Q);

            //console.log(Q.state.dec("bar", 1));
            this.p.direction = (this.p.x - collide.obj.p.x > 0) ? "left" : "right";
            Q.audio.play("hit");
            Q.state.set("power", "ouch");
            if(collide.obj.killPlayer){
                collide.obj.trigger("die");
            }
            
            if(collide.obj.isA("FireHotHead")){
                this.trigger("change_state", KIRBY_STATE.FIRE);
            }else{
                this.trigger("change_state", KIRBY_STATE.HIT);
            this.invencibleTime = INVENCIBILITY_TIME;
            }
            
        }
    },

    /* ATTACK */
    attack: function(){
        if(this.isAttackSwitch) return;
        this.isRunning = false;
        this.flyingTime = 0;

        switch(this.state){
            case KIRBY_STATE.BALLOON:
                this.trigger("change_state", KIRBY_STATE.BLOWING);
            break;
            case KIRBY_STATE.BEND:
                this.trigger("change_state", KIRBY_STATE.SLIDING);
            break;
            case KIRBY_STATE.SLIDING:break;
            default:
                if(this.isChubby){
                    this.trigger("change_state", KIRBY_STATE.BLOWING_STAR);
                }else{
                    this.isAttackSwitch = true;
                    this.p.isStatue = true;
                    this.absorbType = ABSORB_TYPE.ABSORBING;
                    this.trigger("change_state", KIRBY_STATE.ABSORBING);
                }
            break;
        };
        
    },

    attack_end: function(){

        this.absorbType = ABSORB_TYPE.BLOWING;
        this.isAttackSwitch = false;

    },

    /* END ATTACK */
    highJump: function(){
        if(this.isChubby) return;
        this.isRunning = false;
        this.trigger("change_state", KIRBY_STATE.HIGHJUMP);
        this.p.gravity = 0.5;
    },

    balloon: function(){
        // Si somos estatua, no nos debe dejar ni si somos gordos
        if(this.p.isStatue || this.isChubby) return;
        this.isRunning = false;
        this.trigger("change_state", KIRBY_STATE.BALLOON);
        this.p.vy = -220;
        this.p.gravity = 0.5;
    },

    /*BEND*/
    bend: function(){
        // Si somos estatua, no nos debe dejar.
        if(this.p.isStatue) return;
        this.isRunning = false;
        switch (this.state) {
            case KIRBY_STATE.IDLE:
                this.trigger("change_state", KIRBY_STATE.BEND);
                this.p.gravity = 0.5;
                this.p.isStatue = true;
                this.p.vx = 0;
                break;
            case KIRBY_STATE.MOVING:
                this.trigger("change_state", KIRBY_STATE.BEND);
                this.p.gravity = 0.5;
                this.p.isStatue = true;
                this.p.vx = 0;
            break;
            
        };
        
    },

    bend_end: function () {
        this.isRunning = false;
        if (this.state == KIRBY_STATE.BEND) {
            this.trigger("change_state", KIRBY_STATE.IDLE);
            this.p.isStatue = false;
        }

    },

    run: function(){
        if(this.p.isStatue || this.state !== KIRBY_STATE.IDLE) return;
        this.isRunning = true;
        this.trigger("change_state", KIRBY_STATE.MOVING);
    },


    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        this.p.gravity = 0.5; // Reset Gravity
        this.p.speed = INITIAL_SPEED;
        this.wasClimbing = this.p.collisions;
        
        Q("AbsorbMissile").first().onScreen = false;
        Q("CloudParticle").first().trigger("die");

        //console.log(this.wasClimbing);
        //console.log(this);
        const prefix = this.isChubby ? "chubby_" : "";
        this.invencibleTime -= dt;

        switch(this.state){
            
            case KIRBY_STATE.IDLE:
                this.p.speed = /*this.isChubby ? INITIAL_CHUBBY_SPEED : */INITIAL_SPEED; // Reset Speed to initial

                if (!this.isChubby && (this.p.vy > 0 || this.last_state == KIRBY_STATE.BALLOON)) {
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                } else {
                    this.blinkTime = (this.blinkTime + dt) % 2.0;
                    this.trigger("cplay", prefix + (((this.blinkTime >= 1.0) && (this.blinkTime % (1/3)) < 1/6) ? "blink" : "idle"));
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
                
                let max_speed = MAX_SPEED;
                
                if(this.isRunning && this.isChubby) max_speed = MAX_CHUBBY_RUNNING_SPEED;
                else if(this.isRunning) max_speed = MAX_RUNNING_SPEED;
                else if(this.isChubby) max_speed = MAX_CHUBBY_SPEED;

                this.p.speed = max_speed;

                if(this.isRunning && this.p.speed >= max_speed * 0.8){
                    Q("CloudParticle").first().trigger("respawn");
                }

                if (!this.isChubby && this.p.vy > 0 && this.wasClimbing.length != 0){
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }else{
                    if (!this.isChubby && Math.abs(this.p.vx) >= max_speed*0.8 && this.last_direction != this.p.direction) {
                        this.trigger("change_state", KIRBY_STATE.SKID);
                    } else {
                        this.trigger("cplay", prefix + "move");
                        // Transition if the lenght of the x velocity is 0 (stop moving).
                        this.trigger("change_state", Math.abs(this.p.vx) < 0.1 ? KIRBY_STATE.IDLE : KIRBY_STATE.MOVING);
                    }                    
                }
                this.last_direction = this.p.direction;

            break;

            case KIRBY_STATE.ABSORBING:

                // Something eaten
                if(this.isChubby){
                    this.p.isStatue = false;
                    this.trigger("change_state", KIRBY_STATE.IDLE);
                }

                this.absorbTime += dt;
                
                if(this.absorbType == ABSORB_TYPE.ABSORBING){
                    this.p.vx = 0;
                    if(this.absorbTime < 1/8){
                        this.trigger("cplay", "start_absorbing");
                    }else{
                        Q("AbsorbMissile").first().onScreen = true;
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
                if(this.blowingTime < 1/8){
                    this.trigger("cplay", "start_blowing");
                }else if(this.blowingTime < 2/8){
                    Q("BlowMissile").first().trigger("respawn");
                    this.trigger("cplay", "blowing1");
                }else if(this.blowingTime < 3/8){
                    this.trigger("cplay", "blowing2");
                }else{
                    this.blowingTime = 0;
                    this.trigger("change_state", KIRBY_STATE.FALLING);
                }

            break;
            case KIRBY_STATE.BLOWING_STAR:

                this.startTime += dt;

                if(this.startTime <= 3/16){
                    this.trigger("cplay", "star_blowing");
                }else{
                    this.isChubby = false;
                    this.startTime = 0;
                    this.trigger("change_state", KIRBY_STATE.IDLE);
                    Q("StarMissile").first().trigger("respawn");
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

                this.p.speed = this.movingSpeed;
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
                    if (this.fallingSpeed >= 300) {
                        this.trigger("change_state", KIRBY_STATE.BOUNCING);
                    } else {
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                    }
                } else if (this.p.vy > 1 && this.p.vy < 120) {
                    this.trigger("cplay", "falling");
                } else if (this.p.vy >= 300) {
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
                        Q("StarParticle").first().trigger("respawn", this);
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
                    Q("CloudParticle").first().trigger("respawn");
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

                this.slideTime += dt;
                if (this.slideTime < 0.5) {
                    //slideCloud
                    Q("CloudParticle").first().trigger("respawn");
                    this.p.vx = (this.p.direction === "left") ? -MAX_SPEED : MAX_SPEED;
                    this.trigger("cplay", "slide");

                } else {
                    this.p.vx = 0;
                    this.slideTime = 0;
                    this.trigger("change_state", KIRBY_STATE.BEND);
                    this.bend_end();

                }
                
            break;
            case KIRBY_STATE.HIT:

                this.trigger("cplay", `${prefix}hit`);
                this.hitTime += dt;
                if(this.hitTime < 0.1){

                    this.p.vx = (this.p.direction === "left" ? 1 : -1) * 400;

                }else if(this.hitTime < 0.6){   
                    this.hitTime = 0.0;
                    this.p.isStatue = false;
                    this.trigger("change_state", KIRBY_STATE.IDLE);
                }

            break;

            ///////////////////////////////////////////////////////////
            case KIRBY_STATE.BYE:

                this.byeTime += dt;
                this.trigger("cplay", "bye");
                this.p.isStatue = true;
                this.p.vy = 0;
                this.p.vx = 0;
                if(this.byeTime >= 6/16){
                    this.byeTime = 0;
                    this.trigger("change_state", KIRBY_STATE.IDLE);
                    Q.clearStages();
                    Q.audio.stop();
                    Q.stageScene("introScene3", 0);
                    Q.inputKeys = false;
                    const next_level = levels[Q.state.get("current_level")].next_level;
                    Q.state.set("current_level", next_level);
                   
                }

            break;

            case KIRBY_STATE.FIRE:
                    console.log("estado fuego");
                    this.p.isStatue = true;
                    if(this.bounces == 0){
                        this.bounces++;
                        this.invencibleTime = INVENCIBILITY_TIME;
                        this.p.vy = -250;
                        this.p.vx = 20 * (this.p.direction === "left" ? 1 : -1);
                        this.trigger("cplay", "fire_start");
                    }else if(Math.abs(this.p.vy) < 0.01){
                        // First Bounce
                        console.log(this.bounces);
                        if (this.bounces <= 1) {
                            this.bounces++;
                            Q("StarParticle").first().trigger("respawn", this);
                            console.log(this.bounces);
                            this.p.vy = -200;
                            (this.bounces == 1)? this.trigger("cplay", "fire_start"): this.trigger("cplay", prefix + "fire_red");
                        }else{ // Last Bounce
                            this.p.isStatue = false;
                            this.bounces = 0;
                            this.trigger("change_state", KIRBY_STATE.IDLE);
                        }
                    }
    
                break;

        }
        
        // Reset Climbing
        this.isClimbing = false;

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});





