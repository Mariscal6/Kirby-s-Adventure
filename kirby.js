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
            width: 16,
            height: 16,
        }
    },
    blink: {
        frames: [1],
        collision_box: {
            width: 16,
            height: 16,
        }
    },
    move: {
        frames: [1, 2], 
        rate:1 / 5,
        collision_box: {
            width: 16,
            height: 16,
        }
    },
    falling: {
        frames: [7, 8, 9, 0],
        rate: 1 / 16,
        collision_box: {
            width: 16,
            height: 16,
        }
    },
    flying: {
        frames: [12, 13, 20, 21, 22],
        rate: 1/6,
        collision_box: {
            width: 22,
            height: 22
        }
    },
    flying_static_down:{
        frames: [21, 22],
        rate: 1/3,
        collision_box: {
            width: 22,
            height: 22
        }
    },
    flying_static_up:{
        frames: [21, 22],
        rate: 1/8,
        collision_box: {
            width: 22,
            height: 22
        }
    },
});

/* Object */

const KIRBY_STATE = {
    IDLE: 0,
    BALLOON: 1,
    SKID: 2,
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
        this.flying_constant = false;
        this.last_animation = "";

        this.add("platformerControls, Entity");

        /* Events */
        this.on("attack", this, "attack");
        this.on("highJump", this, "highJump");
        this.on("balloon", this, "balloon");
    },

    attack: function(){
        
    },

    highJump: function(){

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
                if(this.p.vy > 0){
                    this.trigger("cplay","falling");
                }else if(Math.abs(this.p.vx) > 0){
                    this.trigger("cplay", "move");
                    this.blink = 0;
                }else{
                    this.blink = (this.blink + 1) % 100;
                    this.trigger("cplay", ((this.blink >= 70) && (this.blink % 15) < 10)  ? "blink" : "idle");
                }
            break;
            case KIRBY_STATE.BALLOON:
                if(this.p.vy >= 0 || this.flying_constant){
                    this.flying_constant = true;
                    this.trigger("cplay", this.p.vy < 0 ? "flying_static_up" : "flying_static_down");
                }
                else{
                    this.flying_constant = false;
                    this.trigger("cplay", "flying");
                }

            break;
        }
        

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

});


