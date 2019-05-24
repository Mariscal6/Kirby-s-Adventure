// ------- Kirby Intro
compiling.audio.push(
    {"title_screen": "TitleScreen.mp3"},
    {"level": "Level1.mp3"},
    {"level1": "VegetableValley.mp3"},
    {"level2": "IceCreamIsland.mp3"},
    {"levelPreBoss": "Grape_Garden.mp3"},
    {"levelBoss": "BossBattle.mp3"},
    {"gameOver": "GameOver.mp3"},
    {"lostLife": "LostLife.mp3"},
    {"hit": "Hit.mp3"}
);

compiling.sheet.push({
    "png_path": "introAnimation.png",
    "json_path": "intro.json"
}, {
    "png_path": "story.png",
    "json_path": "story.json"
}, {
    "png_path": "pressEnter.png",
    "json_path": "pressEnter.json"
}, {
    "png_path": "transition1.png",
    "json_path": "transitions.json"
}, {
    "png_path": "hand.png",
    "json_path": "hand.json"
}, {
    "png_path": "deathScreen.png",
    "json_path": "deathScreen.json"
},{
    "png_path": "win.png",
    "json_path": "win.json"
});

var aux = new Array(60);
for (let i = 0; i < 59; i++){
    aux[i] = i;
}
Q.animations("intro", {
    intro1: {
        frames: aux, 
        rate: 1/10,
    },
    fin: {
        frames: [59]
    }
});

Q.animations("storyAnim", {
    story: {frames:[0, 1, 2, 3, 4], rate: 3},
    end: {frames:[4]}
});

Q.animations("transitions", {
    level: {frames: [0]},
    //level 1
    level1: {frames:[0]},
    //level 2
    level2: {frames:[1]},
    //level 3
    levelPreBoss: {frames:[2]},
    //level 4
    levelBoss: {frames:[3]}
});

Q.animations("enter", {
    blink: {frames:[0,1], rate: 1/2}
});

Q.animations("handSelect", {
    select: {frames:[0]}
});

Q.animations("winAnim", {
    win: {frames:[0]}
});

Q.animations("deathAnim", {
    gameOver: {frames:[0]},
    continue: {frames:[1]}
});

Q.Sprite.extend("enter", {
    init: function(p){
        this._super(p, {
            x: 365,
            y: 450,
            sheet: "press",
            sprite: "enter",
        });
        this.add('animation');
    },
    step: function(dt){
        this.play("blink");
    }
});

Q.Sprite.extend("transitionLevel", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 40,
            sheet: "transition",
            sprite: "transitions",         
        });
        this.add('animation');
    },
    step: function(dt){
        this.play(Q.state.get("current_level"));
    }
});

Q.Sprite.extend("deathScene", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 40,
            sheet: "deathScreen",
            sprite: "deathAnim",
            time: 0
        });
        this.add('animation');
        
    },
    step: function(dt){
        this.p.time += dt;
            this.play("continue");
    }
});


Q.Sprite.extend("gameOver", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 40,
            sheet: "deathScreen",
            sprite: "deathAnim",
            time: 0
        });
        this.add('animation');
        
    },
    step: function(dt){
        this.p.time += dt;
            this.play("gameOver");
    }
});


Q.Sprite.extend("win", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 40,
            sheet: "win",
            sprite: "winAnim",
            time: 0
        });
        this.add('animation');
        
    },
    step: function(dt){
        console.log("entra");
        this.play("win");
    }
});

Q.Sprite.extend("hand", {
    init: function(p){
        this._super(p, {
            x: p.x,
            y: p.x,
            sheet: "hand",
            sprite: "handSelect",
            time: 0
        });
        this.continue = true;
        this.add('animation');
    },
    step: function(dt){
        this.p.y=(this.continue)? -55:12;
        this.play("select");  
    }
});
Q.Sprite.extend("story", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 55,
            sheet: "story",
            sprite: "storyAnim",
            time: 0
        });
        this.add('animation');
    },
    step: function(dt){
        this.p.time += dt;
        if(this.p.time < 15){
            this.play("story");
        }
        else{
            this.play("end");
        }
    }
});


Q.Sprite.extend("introEntity", {
    init: function(p) {
        this._super(p, {
            x: 55,
            y: 55,
            sheet: "intro",
            sprite: "intro",
            drawed: false,
            totalTime: 0
        });
        this.add("animation");
    },
    step: function (dt){
        this.p.totalTime += dt;
        if (this.p.totalTime < 59/10) {
            this.play("intro1");
        }else{
            this.play("fin");
        }
    }
});

Q.scene('introScene',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180,
    }));

    Q.audio.play("title_screen");
    
    stage.insert(new Q.introEntity(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");
        Q.clearStages();
        Q.stageScene('introScene2');
    });
});


Q.scene('introScene2',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180,
    }));

    stage.insert(new Q.story(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        Q.audio.stop();
        Q.clearStages();
        Q.stageScene('introScene3');
    });
});

Q.scene('introScene3',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180, 
    }));
    
    Q.audio.play(Q.state.get("current_level"));
    stage.insert(new Q.transitionLevel(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        Q.clearStages();
        Q.inputKeys = true;
        Q.stageScene(Q.state.get("current_level"));
    });
});

Q.scene('deathScene',function(stage) {
    Q.handSelection = true;
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180,
    }));
    Q.audio.stop();
    Q.audio.play("gameOver");
    stage.insert(new Q.deathScene(), container);
    stage.insert(new Q.hand({x:-42, y:-60}), container);
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        if(Q("hand").first().continue){
            Q.audio.stop();
            Q.clearStages();
            Q.inputKeys = true;
            Q.handSelection = false;
            Q.audio.play(Q.state.get("current_level"));
            Q.stageScene(Q.state.get("current_level"));
        }else{
            Q.clearStages();
            Q.stageScene("deathScene2");
        }
        
    });
});

Q.scene('deathScene2',function(stage) {
    Q.handSelection = true;
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180,
    }));
    Q.audio.play("gameOver");
    stage.insert(new Q.gameOver(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() {  Q.audio.stop();
        Q.clearStages();
        Q.inputKeys = true;
        Q.handSelection = false;
        Q.stageScene("introScene");
    });
});


Q.scene('win',function(stage) {
    Q.handSelection = true;
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180,
    }));
    //Q.audio.play("gameOver");
    stage.insert(new Q.win(), container);
    //stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() {  
        Q.audio.stop();
        Q.clearStages();
        Q.inputKeys = true;
        Q.handSelection = false;
        //Q.stageScene("introScene");
    });
});
