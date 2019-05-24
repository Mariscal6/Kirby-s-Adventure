/* Load Sprite */
compiling.sheet.push({
    "png_path": "boss.png",
    "json_path": "boss.json"
});

/* Animations */
Q.animations("Boss", {
    idle: {
        frames: [0, 1],
        rate: 1/3,
        collision_box: {
            width: 50,
            height: 50,
        }
    },
    jump:{
        frames: [6],
        rate:1/8,
        collision_box: {
            width: 50,
            height: 50,
        },
    },
    attack:{
        frames: [3, 4, 5, 6],
        rate:1/8,
        collision_box: {
            width: 50,
            height: 50,
        },
    },
    die:{
        frames: [7, 8],
        rate:1/8,
        collision_box: {
            width: 50,
            height: 50,
        },
    },
});

Q.Sprite.extend("Boss", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "boss",
            sprite: "Boss"
        });
        this.add("Enemy");

        this.attack_cycle = 1.0;
        this.attack_duration = 1.5;
        this.num_attacks = 1;

        this.jump_cycle = 2.0;
        this.jump_high = 500;

        this.bossEntity = new Array(3).fill(0).map((e,i) => new Q.BossMissile(i));
        this.bossEntity.forEach(e => Q.stage(0).insert(e));

        this.isBoss = true;
    },

    attack: function(dt){
        if(Math.random() < 0.6){
            this.bossEntity.forEach(e => e.trigger("respawn", this, dt));
        }else{

            Q.stage(0).insert(new Q.SoundEnemy({self: this, angle: 0}));
            Q.stage(0).insert(new Q.SoundEnemy({self: this, angle: Math.PI}));
            Q.stage(0).insert(new Q.SoundEnemy({self: this, angle: -Math.PI/2}));
        }
    },

    step: function(){
        if(this.time_attack > 0) return;

        this.p.vx = Math.sign(Q("Kirby").first().p.x - this.p.x) * 50;

    }
});





