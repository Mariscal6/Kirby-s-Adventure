// ------- Kirby Intro
compiling.sheet.push({
    "png_path": "introAnimation.png",
    "json_path": "intro.json"
});

compiling.sheet.push({
    "png_path": "story.png",
    "json_path": "story.json"
});

compiling.sheet.push({
    "png_path": "pressEnter.png",
    "json_path": "pressEnter.json"
});

compiling.sheet.push({
    "png_path": "transition1.png",
    "json_path": "transitions.json"
});

compiling.sheet.push({
    "png_path": "hand.png",
    "json_path": "hand.json"
});

compiling.sheet.push({
    "png_path": "deathScreen.png",
    "json_path": "deathScreen.json"
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
    //level 1
    level: {frames:[0]},
    //level 2
    level1: {frames:[1]},
    //level 3
    level2: {frames:[2]},
    //level 4
    level3: {frames:[3]}
});

Q.animations("enter", {
    blink: {frames:[0,1], rate: 1/2}
});

Q.animations("handSelect", {
    select: {frames:[0]}
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
            x: p.x,
            y: p.y,
            sheet: "transition",
            sprite: "transitions",         
        });
        this.add('animation');
    },
    step: function(dt){
        //const aux = levels[Q.state.get("current_level")].next_level;
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
        //Q.audio.stop("sonido_logotipo_intro.ogg");
        Q.clearStages();
        Q.stageScene('deathScene');
    });
});

Q.scene('introScene3',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        x: 200,
        y: 200,
        h: 180,
        w: 180, 
    }));
    stage.insert(new Q.transitionLevel({ x: 55, y: 40}), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");
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
    stage.insert(new Q.deathScene(), container);
    stage.insert(new Q.hand({x:-42, y:-60}), container);
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");
        if(Q("hand").first().continue){
            Q.clearStages();
            Q.inputKeys = true;
            Q.handSelection = false;
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
    stage.insert(new Q.gameOver(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");        
    });
});
