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
        this.attack_duration = 2.0;
        this.jump_cycle = Number.MAX_SAFE_INTEGER;
    },

    attack: function(){
        //this.isStatue = true;
        /*var stage = Q.stage(0);
        var fire = stage.insert(new Q.FireHotHead({
            y: this.p.y,
            x: this.p.x + (32 + 32) / 2 * (this.p.direction === "Left" ? -1 : 1),
            vx: this.p.vx,
            direction: this.p.direction
        }));*/
    },
});





