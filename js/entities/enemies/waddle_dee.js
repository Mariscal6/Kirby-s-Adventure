/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle_dee.png",
    "json_path": "waddle_dee.json"
});

/* Animations */
Q.animations("WaddleDee", {
    idle: {
        frames: [0, 1],
        rate: 1/3,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    jump: {
        frames: [0, 1],
        rate: 1/8,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    attack:{
        frames: [1, 3],
        rate:1/8,
        collision_box: {
            width: 30,
            height: 30,
        },
    },
    die:{
        frames: [2],
        rate: 1/8,
        collision_box: {
            width: 30,
            height: 30,
        },
    },
});

/* Object */

Q.Sprite.extend("WaddleDee", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle_dee",
            sprite: "WaddleDee",
        });
        this.add("Enemy");

        this.attack_cycle = Number.MAX_SAFE_INTEGER;
        this.attack_duration = 2.0;

        // Jump
        this.jump_cycle = Number.MAX_SAFE_INTEGER;
        this.jump_high = 0;

        this.p.speed = 50;

    },

    
    attack: function(){
        
        //this.isStatue = true;
        /*
        var stage=Q.stage(0);
        var fire = stage.insert(new Q.FireWaddle({
            y:this.p.y,
            x:this.p.x,
            direction:this.p.direction
         }));
         this.p.vx=0;
        */
    },
    // Update Step
    /*step: function(dt){

        console.log(1);
    },*/
});





