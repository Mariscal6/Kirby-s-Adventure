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

var aux = new Array(60);
for (let i =0; i < 61; i++){
    aux[i] = i;
}
Q.animations("intro", {
    intro1: {
        frames: aux, 
        rate: 1/8,
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
    first: {frames:[0]}
});

Q.animations("enter", {
    blink: {frames:[0,1], rate: 1/2}
});

Q.Sprite.extend("enter", {
    init: function(p){
        this._super(p, {
            x: 365,
            y: 450,
            sheet: "press",
            sprite: "enter",
            scale: 2.1  
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
            y: 55,
            sheet: "transition",
            sprite: "transitions",
            scale: 2.1  
        });
        this.add('animation');
    },
    step: function(dt){
        this.play("first");
    }
});

Q.Sprite.extend("story", {
    init: function(p){
        this._super(p, {
            x: 55,
            y: 55,
            sheet: "story",
            sprite: "storyAnim",
            scaleToFit: true,
            scale: 2.1,
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
        if (this.p.totalTime < 7.5) {
            this.play("intro1");
        }else{
            this.play("fin");
        }
    }
});

Q.scene('introScene',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        //asset:  "InitScreen/KirbyNES04.png",
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
    stage.insert(new Q.transitionLevel(), container);
    stage.insert(new Q.enter());
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");
        Q.clearStages();
        Q.stageScene('level');
    });
});





Q.animations("menuChoicesAnim",{
    initial: {  
        frames: [0,1,2,3,4,5,6,7,8,9,10,11], 
        rate:1/2
    },
    static: {  
        frames: [11]
    }
    
});


Q.Sprite.extend("menuChoice", {
    init: function(){
        this._super(p, {
            x: 0,
            y: 0,
            h: 10,
            w: 10, 
            //sheet: "menuChoices",
            //sprite: "menuChoicesAnim",
            ready: false,
        }); 
        this.add("animation");  
    },
    step: function(dt){
        if(this.p.ready){
             this.play("initial");
             this.p.ready = false;
        }
        else{
            this.play("static");
           
        }
    }
});

