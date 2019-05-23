/* Load Sprite */
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});

/* Animations */
Q.animations("hotHead", {
    idle: {
        frames: [0,1],
        rate: 1/3,
        sheet: "hotHead",
        collision_box: {
            width: 32,
            height: 32,
        }
    },
    die:{
        frames: [0,1],
        rate:1/10,
        sheet: "attack",
        collision_box: {
            width: 32,
            height: 32,
        },
    },
    attack:{
        frames: [2,3],
        rate:1 / 10,
        sheet: "attack",
        collision_box: {
            width: 32,
            height: 32,
        },
    }
});

/* Object */

const HOTHEAD_STATE = {
    IDLE: 0,
    ATTACK: 1,
    DIE: -1,
};

Q.Sprite.extend("HotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "hotHead",
            sprite: "hotHead"
        });
        this.add("Enemy");

        this.attack_cycle = 4.0;
        this.attack_duration = 0.4;
        this.jump_cycle = Number.MAX_SAFE_INTEGER;

        this.fireEntity = new Q.FireHotHead();
        Q.stage(0).insert(this.fireEntity);
    },

    attack: function(){
        this.fireEntity.trigger("respawn", this);
    },
});





