/* Load Sprite */
compiling.sheet.push({
    "png_path": "sparky.png",
    "json_path": "sparky.json"
});

/* Animations */
Q.animations("Sparky", {
    idle: {
        frames: [1, 2],
        rate: 1/3,
        collision_box: {
            width: 30,
            height: 30,
        }
    },
    jump:{
        frames: [0],
        rate:1/8,
        collision_box: {
            width: 30,
            height: 30,
        },
    },
    attack:{
        frames: [4],
        rate:1/8,
        collision_box: {
            width: 30,
            height: 30,
        },
    },
    die:{
        frames: [5, 6],
        rate:1/8,
        collision_box: {
            width: 30,
            height: 30,
        },
    },
});

Q.Sprite.extend("Sparky", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "sparky",
            sprite: "Sparky"
        });
        this.add("Enemy");

        this.attack_cycle = 2.0;
        this.attack_duration = 0.5;

        this.jump_cycle = 0.4;
        this.jump_high = 300;

        console.log(this);
        //this.fireEntity = new Q.FireHotHead();
        //Q.stage(0).insert(this.fireEntity);
    },

    attack: function(){
        console.log(1);
        //this.fireEntity.trigger("respawn", this);
    },
});





