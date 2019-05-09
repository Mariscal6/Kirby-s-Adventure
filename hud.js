
compiling.sheet.push({
    "png_path": "HUD/hud.png",
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
    "png_path": "HUD/numbers.png",
    "json_path": "numbers.json"
});

Q.animations("lifesMove", {
    move:{
        frames: [0, 1, 2, 1],
        rate: 1/5
    }
});

Q.animations("powersKirby", {
    normal: {
        frames: [0]
    },
    back_drop:{
        frames:[1]
    }
    
});

Q.animations("healthKirby", {
    shine:{
        frames: [0, 1],
        rate: 1/2
    },
    hyphen: {
        frames: [2]
    }
});


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


Q.Sprite.extend("MainHUD", {
    init: function(p){
        this._super(p, {
            sheet: "hud",
            x:0,
            y:0,
            scaleToFit: true
        });
        this.add('animation');
    },
    step: function(){
    }
});

Q.Sprite.extend("LifesHUD", {
    init: function(p){
        this._super(p, {
            sheet: "lifes",
            sprite: "lifesMove",
            x:220,
            y:0,
            h: 62,
            w: 44
        });
        this.add('animation');
    },
    step: function(){
        this.play("move");
    }
});

Q.Sprite.extend("lifesNumber", {
    init: function(p){
        this._super({
            sheet: "numbers",
            sprite: "numbersLifes",
            x: p.x,
            y: 0,
            status: p.number,
            w: 335,
            h: 0
        });
        this.add('animation');
    },
    step: function(){
        if(this.p.status == 'first')
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
            y: 28,
            w: 300,
            h: 0
        });
        this.add('animation');
    },
    step: function(){
        this.play(Math.floor(Q.state.get("score") / (10 ** this.p.index)) % 10);
    }
});

Q.Sprite.extend("HealthBar", {
    init: function(p){
        this._super(p, {
            sheet: "health",
            sprite: "healthKirby",
            y: 0,
            h: 111,
            w: 335,
        });
        this.add('animation');
        console.log(this.p.index);
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


Q.Sprite.extend("PowersHUD", {
    init: function(p){
        this._super(p, {
            sheet: "powers",
            sprite: "powersKirby",
            x: 71,
            y:0,
            h: 152,
            w: 16,
            scaleToFit: true
        });
        this.add('animation');
    },
    step: function(){
        this.play(Q.state.get("power"));
    }
});



Q.scene("HUD", function(stage) {
    
    var container = stage.insert(new Q.UI.Button({
        fill: "pink",
        border: 5,
        w: 800,
        h: 150,
        y: 497,
        x: 400,
    }));
    var aux = 100000000;
    aux.toString();
    
    stage.insert(new Q.MainHUD(), container);
    stage.insert(new Q.LifesHUD(), container);
    stage.insert(new Q.PowersHUD(), container);

    for (let index = 0; index < 6; index++) {
        var aux = index * 27;
        stage.insert(new Q.HealthBar({
            x: aux, 
            y: 0,
            status: "nohit", 
            index: index
        }),container);
    }
    stage.insert(new Q.lifesNumber({
        x: 295, 
        number: 'first'
    }), container);
    
    stage.insert(new Q.lifesNumber({
        x: 322,
        number: 'second'
    }), container);
    
    var scoreAux = Q.state.get("score");
    
    for(let index = 0; index < 7; ++index){
        
        stage.insert(new Q.scoreNumbers({
            x:0 - index * 24,
            index: index
        }), container);
        
    }
});

