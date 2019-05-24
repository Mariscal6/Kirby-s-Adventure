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
            width: 25,
            height: 25,
        }
    },
    jump:{
        frames: [0],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
        },
    },
    attack:{
        frames: [4],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
        },
    },
    die:{
        frames: [5, 6],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
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
        this.num_attacks = 4;

        this.jump_cycle = 0.4;
        this.jump_high = 300;

        this.sparkEntity = new Array(6).fill(0).map(e => new Q.SparkyMissile());
        this.sparkEntity.forEach(e => Q.stage(0).insert(e));
    },

    attack: function(dt){
        this.sparkEntity.forEach(e => e.trigger("respawn", this, dt));
    },
});





