/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle_doo.png",
    "json_path": "waddle_doo.json"
});

/* Animations */
Q.animations("WaddleDoo", {
    idle: {
        frames: [0, 1],
        rate: 1/3,
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    jump: {
        frames: [0, 1],
        rate: 1/10,
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die:{
        frames: [2, 3, 4],
        rate: 1/10,
        collision_box: {
            width: 32,
            height: 32,
        },
    },
    attack:{
        frames: [1, 3],
        rate: 1/10,
        collision_box: {
            width: 32,
            height: 32,
        },
    }
});

/* Object */

Q.Sprite.extend("WaddleDoo", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle_doo",
            sprite: "WaddleDoo",
        });
        this.add("Enemy");

        this.attack_cycle = 2.0;
        this.attack_duration = 2.0;

        // Jump
        this.jump_cycle = 3;
        this.jump_high = 400;

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





