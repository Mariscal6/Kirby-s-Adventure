/* Load Sprite */
compiling.sheet.push({
    "png_path": "gordo.png",
    "json_path": "gordo.json"
});

/* Animations */
Q.animations("Gordo", {
    idle: {
        frames: [0, 1],
        rate: 1/3,
        collision_box: {
            width: 25,
            height: 25,
        }
    },
    jump:{
        frames: [],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
        },
    },
    attack:{
        frames: [],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
        },
    },
    die:{
        frames: [2, 3],
        rate:1/8,
        collision_box: {
            width: 25,
            height: 25,
        },
    },
});

Q.Sprite.extend("Gordo", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "gordo",
            sprite: "Gordo"
        });

        this.add("Enemy");

        this.attack_cycle = Number.MAX_SAFE_INTEGER;
        this.attack_duration = 0.0;
        this.num_attacks = 0.0;

        this.jump_cycle = Number.MAX_SAFE_INTEGER;
        this.jump_high = 0.0;

        this.p.gravity = false;

        this.timeMoving = 0;
        this.p.ox = this.p.x;
        this.p.oy = this.p.y;

        this.p.Radius = parseFloat(this.p.Radius);
        this.p.Angle = parseFloat(this.p.Angle);
    },

    attack: function(dt){},


    step: function(dt){
        this.timeMoving += dt;
        
        this.p.skipCollision = true;
        this.p.gravity = false;
        this.p.x = this.p.ox + Math.cos(this.timeMoving * this.p.Angle) * this.p.Radius;
        this.p.y = this.p.oy + Math.sin(this.timeMoving * this.p.Angle) * this.p.Radius;
    }
});





