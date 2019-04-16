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
        frames: [0]
    },
    blink: {
        frames: [1]
    },
    move: {
        frames: [1, 2], 
        rate:1/5
    },
    falling: {
        frames: [7, 8, 9, 0],
        rate: 1/16
    }
});

/* Object */
Q.Sprite.extend("Kirby", {

    init: function(p){

        this._super(p, {
            sheet: "kirby",
            sprite: "kirby",
            x: 100,
            y: 100,
        });

        this.blink = 0;
        
        this.add("animation, 2d, platformerControls");
    }, 

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(){
        console.log(Q._generateCollisionPoints(this.p));

        if(this.p.vy > 0){
            this.play("falling");
        }else if(Math.abs(this.p.vx) > 0){
            this.play("move");
            this.blink = 0;
        }else{
            this.blink = (this.blink + 1) % 100;
            this.play(((this.blink >= 70) && (this.blink % 15) < 10)  ? "blink" : "idle");
        }

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },


});


