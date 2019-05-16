/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle.png",
    "json_path": "waddle.json"
});

/* Animations */
Q.animations("waddle", {
    idle: {
        frames: [0, 1],
        rate: 1 / 3,
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    jump: {
        frames: [0, 1],
        rate: 1 / 10,
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die:{
        frames: [2, 3, 4],
        rate:1 / 10,
        collision_box: {
            width: 32,
            height: 32,
        },
    },
    attack:{
        frames: [1, 3],
        rate:1 / 10,
        collision_box: {
            width: 32,
            height: 32,
        },
    }
});

/* Object */

Q.Sprite.extend("Waddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "waddle",
            gravity: 0.87,
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





