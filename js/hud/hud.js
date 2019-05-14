compiling.sheet.push({
    "png_path": "HUD/hud-normal.png",
    "json_path": "hud.json"
});

compiling.sheet.push({
    "png_path": "HUD/lifes.png",
    "json_path": "lifes.json"
});

compiling.sheet.push({
    "png_path": "HUD/powers.png",
    "json_path": "powers.json"
});

compiling.sheet.push({
    "png_path": "HUD/health.png",
    "json_path": "health.json"
});
compiling.sheet.push({
    "png_path": "HUD/bossHealth.png",
    "json_path": "healthBoss.json"
});

compiling.sheet.push({
    "png_path": "HUD/numbers.png",
    "json_path": "numbers.json"
});

compiling.sheet.push({
    "png_path": "HUD/hudMenu.png",
    "json_path": "hudMenu.json"
});

compiling.sheet.push({
    "png_path": "HUD/hudBoss.png",
    "json_path": "boss.json"
});

compiling.sheet.push({
    "png_path": "HUD/miniHealth.png",
    "json_path": "miniHealth.json"
});


Q.animations("hud", {
    hud:{
        frames: [0],
        rate: 1/5
    }
});

Q.Sprite.extend("MainHUD", {
    init: function(p){
        this._super(p, {

            x: 8,
            y: 18,
            width: 256 * 2,
            height: 240 / 2
        });
        this.add('animation');
    },
    step: function(){
        this.play("hud");
    }
});

/* "lifesMove" */
Q.animations("lifesMove", {
    move:{
        frames: [0, 1, 2, 1],
        rate: 1/6
    }
});

Q.Sprite.extend("LifesHUD", {
    init: function(p){
        this._super(p, {
            w: 26,
            h: 69,
        });
        this.add('animation');
    },
    step: function(){
        this.play("move");
    }
});

/* "numbersLifes" */
Q.animations("numbersLifes", {
    0:{frames: [0]},
    1:{frames: [1]},
    2:{frames: [2]},
    3:{frames: [3]},
    4:{frames: [4]},
    5:{frames: [5]},
    6:{frames: [6]},
    7:{frames: [7]},
    8:{frames: [8]},
    9:{frames: [9]}
});

Q.Sprite.extend("lifesNumber", {
    init: function(p){
        this._super(p, {
            sheet: "numbers",
            sprite: "numbersLifes",
            w: 20,
            h: 20
        });
        this.add('animation');
    },
    step: function(){
        if(this.p.number == 'first')
            this.play(0);
        else
            this.play(Q.state.get("lives"));
    }
});

Q.Sprite.extend("scoreNumbers", {
    init: function(p){
        this._super(p, {
            sheet: "numbers",
            sprite: "numbersLifes",
            w: 19,
            h: 37,
        });
        this.add('animation');
    },
    step: function(){
        this.play(Math.floor(Q.state.get("score") / (10 ** this.p.index)) % 10);
    }
});

/* "healthKirby" */

Q.animations("healthKirby", {
    shine:{
        frames: [0, 1],
        rate: 1/2
    },
    hyphen: {
        frames: [2]
    }
});

Q.Sprite.extend("HealthBar", {
    init: function(p){
        this._super(p, {
            sprite: "healthKirby",
            w: 210,
            h: 110,
        });
        this.add('animation');
    },

    step: function(){

        if(this.p.index >= Q.state.get("bar")){
            this.play("hyphen");
        }
        else  {
            this.play("shine");
        }
    }
});

Q.animations("minihealth", {
    nohit:{frames:[0]},
    hit: {frames:[1]}
});

Q.Sprite.extend("miniHealth",{
    init: function(p){
        this._super(p, {
            sprite: "minihealth",
            w: 210,
            h: 110,
        });
        this.add('animation');
    },
    step: function(){
        if(this.p.index >= Q.state.get("bar")){
            this.play("hit");
        }
        else  {
            this.play("nohit");
        }
    }
});


Q.Sprite.extend("bossHealth",{
    init: function(p){
        this._super(p, {
            sheet: "bossH",
            sprite: "bossHealth",
            w: 19,
            h: 37,
        });
        this.add('animation');
    },

    step: function(){
        this.play("hitted");
        if(this.p.index >= Q.state.get("bossHEALTH")){
           this.play("hitted");
        }
        else  {
            this.play("intact");
        }
    }
});

/* "powersKirby" */

Q.animations("powersKirby", {
    normal: {
        frames: [0]
    },
    back_drop:{
        frames:[1]
    }

});

Q.Sprite.extend("PowersHUD", {
    init: function(p){
        this._super(p, {
            sprite: "powersKirby",
            height: 135,
            scaleToFit: true
        });
        this.add('animation');
    },
    step: function(){
        this.play(Q.state.get("power"));
    }
});



Q.scene("HUD", function(stage) {

    var container = stage.insert(new Q.UI.Container({
        x: 496 / 2,
        y: 240 * 2 - 240 / 4,
        w: 256 * 2,
        h: 240 / 2,
    }));

    stage.insert(new Q.MainHUD({sheet: "hud", sprite: "hud"}), container);
    stage.insert(new Q.LifesHUD({ sheet: "lifes", sprite: "lifesMove", x: 151, y: 18}), container);
    stage.insert(new Q.PowersHUD({sheet: "powers",  x: 82, y: -5, width: 64}), container);

    for (let index = 0; index < 6; index++) {
        stage.insert(new Q.HealthBar({
            x: index * 16,
            y: 18,
            sheet: "health",
            status: "nohit",
            index: index
        }), container);
    }
    stage.insert(new Q.lifesNumber({
        x: 197,
        y: -2,
        number: 'first'
    }), container);

    stage.insert(new Q.lifesNumber({
        x: 214,
        y: -2,
        number: 'second',
    }), container);

    var scoreAux = Q.state.get("score");

    for(let index = 0; index < 7; ++index){

        stage.insert(new Q.scoreNumbers({
            x: 2 - index * 16,
            y: 24,
            index: index
        }), container);

    }
});



Q.scene("MENU", function(stage) {

    var container = stage.insert(new Q.UI.Container({
        x: 496 / 2,
        y: 240 * 2 - 240 / 4,
        w: 256 * 2,
        h: 240 / 2,
    }));

    stage.insert(new Q.MainHUD({sheet: "hudMenu", sprite: "hud"}), container);
    stage.insert(new Q.PowersHUD({sheet: "powers",  x: -190, y: -6, width: 60}), container);

    for (let index = 0; index < 6; index++) {
        stage.insert(new Q.miniHealth({
            x: 86 + index * 21,
            y: 70,
            sheet: "miniHealth",
            status: "nohit",
            index: index
        }), container);
    }
    stage.insert(new Q.lifesNumber({
        x: 180,
        y: 27,
        number: 'first'
    }), container);

    stage.insert(new Q.lifesNumber({
        x: 197,
        y: 27,
        number: 'second'
    }), container);
});



Q.scene("BOSS", function(stage) {

    var container = stage.insert(new Q.UI.Container({
        x: 496 / 2,
        y: 240 * 2 - 240 / 4,
        w: 256 * 2,
        h: 240 / 2,
    }));

    stage.insert(new Q.MainHUD({sheet: "boss", sprite: "hud"}), container);
    stage.insert(new Q.LifesHUD({ sheet: "lifes", sprite: "lifesMove", x: 151, y: 18}), container);
    stage.insert(new Q.PowersHUD({sheet: "powers",  x: 82, y: -5, width: 64}), container);

    for (let index = 0; index < 6; index++) {
        stage.insert(new Q.HealthBar({
            x: index * 16,
            y: 18,
            sheet: "health",
            status: "nohit",
            index: index
        }), container);
    }

    for (let index = 0; index < 15; index++) {
        stage.insert(new Q.bossHealth({
            x: -100 + index * 9,
            y: 24,
            sheet: "bossHealth",
            status: "nohit",
            index: index
        }), container);
    }
    stage.insert(new Q.lifesNumber({
        x: 197,
        y: -2,
        number: 'first'
    }), container);

    stage.insert(new Q.lifesNumber({
        x: 214,
        y: -2,
        number: 'second',
    }), container);

    for(let index = 0; index < Q.state.get("bossHEALTH"); ++index){
        stage.insert(new Q.bossHealth({
            x: -95 + index * 9,
            y: 24,
            index: index
        }), container);

    }
});
