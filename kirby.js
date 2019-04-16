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
        this.last_animation = "";
        
        this.add("animation, 2d, platformerControls");
    }, 

    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(){
        if(this.p.vy > 0){
            this.cplay("falling");
        }else if(Math.abs(this.p.vx) > 0){
            this.cplay("move");
            this.blink = 0;
        }else{
            this.blink = (this.blink + 1) % 100;
            this.cplay(((this.blink >= 70) && (this.blink % 15) < 10)  ? "blink" : "idle");
        }

        // Flip in movement
        this.p.flip = (this.p.direction === "left") ? "x" : undefined;
    },

    // Override Play
    cplay: function(str){
        this.play(str);
        /*
            Optimization:
                - We are not changin all the time the collision box, just when the
                - animation did.
        */
        if(this.last_animation != str){
            this.last_animation = str;
            // left top
            const box = Q.animation(this.p.sprite, str).collision_box;
            const hw = box.width >> 1, hh = box.height >> 1;

            // left top
            [this.p.points[0][0], this.p.points[0][1]] = [-hw, -hh];
            // right top
            [this.p.points[1][0], this.p.points[1][1]] = [+hw, -hh];
            // left bottom
            [this.p.points[2][0], this.p.points[2][1]] = [+hw, +hh];
            // right bottom
            [this.p.points[3][0], this.p.points[3][1]] = [-hw, +hh];
            
        }
    },

});


