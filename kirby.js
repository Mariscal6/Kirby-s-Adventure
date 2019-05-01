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

    /* FALLING */
    falling: {
        frames: [7, 8, 9, 0],
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
    jumping_fall: {
        frames: [11],
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
    DIE: -1,
};


Q.Sprite.extend("Kirby", {

    init: function(p){

        this._super(p, {
            sheet: "kirby",
            sprite: "kirby",
            x: 100,
            y: 100,
        });

        this.state = KIRBY_STATE.IDLE;
        this.blink = 0;
        this.flipped=false;
        this.jumpTime=0;
        this.flying_constant = false;
        this.last_animation = "";

        this.add("platformerControls, Entity");

        /* Events */
        this.on("attack", this, "attack");
        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");
    },

    attack: function(){
        
        switch(this.state){
            case KIRBY_STATE.BALLOON:
                this.state = KIRBY_STATE.IDLE;
                this.flying_constant = false;
            break;
        }
    },

    highJump: function(){
        this.state = KIRBY_STATE.HIGHJUMP;
        this.p.gravity = 0.5;
    },

    balloon: function(){
        this.state = KIRBY_STATE.BALLOON;
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

                this.blink = (this.blink + 1) % 100;
                this.trigger("cplay", ((this.blink >= 70) && (this.blink % 15) < 10)  ? "blink" : "idle");
                
                // Transition if the lenght of the x velocity is greater than 0 (is moving).
                this.state = Math.abs(this.p.vx) > 0.1 ? KIRBY_STATE.MOVING : KIRBY_STATE.IDLE;

            break;

            case KIRBY_STATE.MOVING:

                this.trigger("cplay", "move");
                this.blink = 0;
                
                // Transition if the lenght of the x velocity is 0 (stop moving).
                this.state = Math.abs(this.p.vx) < 0.1 ? KIRBY_STATE.IDLE : KIRBY_STATE.MOVING;

            break;
            
            case KIRBY_STATE.ABSORB:
                
                this.trigger("cplay", "absorb");

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
                console.log(this.jumpTime);
                if (Math.abs(this.p.vy) < 0.01 && this.flipped) {               
                    this.state = KIRBY_STATE.IDLE;
                    this.jumpTime = 0;
                    this.flipped = false;
                } else if (Math.abs(this.p.vy) < 50 && !this.flipped) {
                    this.trigger("cplay", "falling");
                    this.jumpTime += dt;
                    if (this.jumpTime > 0.15) {
                        this.flipped = true;
                    }
                } else if (this.p.vy < -50) {
                    this.trigger("cplay", "jumping");
                } else if (this.p.vy > 50) {
                    this.jumpTime = 0;
                    this.trigger("cplay", "jumping_fall");
                }

                break;
        }
        

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});


