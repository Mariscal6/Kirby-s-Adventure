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
        rate: 1/8,
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
        this.attack_duration = 0.5;

        // Jump
        this.jump_cycle = 3;
        this.jump_high = 400;

        this.sparkEntity = new Array(3).fill(0).map((e, i) => new Q.WaddleDooMissile(i));
        this.sparkEntity.forEach(e => Q.stage(0).insert(e));
    },

    
    attack: function(){
        this.sparkEntity.forEach((e, i) => e.trigger("respawn", this));
    },
});





