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
Q.animations("absorb_enity", {
    idle: {
        frames: [0],
        collision_box: {
            width: 30,
            height: 30,
        }
    },

});

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

        this.flyingTime = 0;

        switch(this.state){
            case KIRBY_STATE.BALLOON:
                this.trigger("change_state", KIRBY_STATE.IDLE);
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

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        /*if (this.state != this.last_state) {
            console.log(this.state);
        }*/
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
                        this.trigger("change_state", KIRBY_STATE.IDLE);
                        this.p.isStatue = false;
                    }
                }

            break;

            case KIRBY_STATE.BLOWING:

                this.blowingTime = 0;

            break;

            case KIRBY_STATE.BALLOON:
            
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
                if(this.skiddingTime < 1/6){
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
        }
        
        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});





