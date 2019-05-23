// ------- Kirby Intro
compiling.sheet.push({
    "png_path": "introAnimation.png",
    "json_path": "intro.json"
});
var aux = new Array(62);
for (let i =0; i < 63; i++){
    aux[i] = i;
}
Q.animations("intro", {
    intro1: {
        frames: aux, 
        rate: 1/6,
    },
    fin: {
        frames: [10]
    }
});

Q.Sprite.extend("introEntity", {
    init: function(p) {
        this._super(p, {
            x: 55,
            y: 55,
            sheet: "intro",
            sprite: "intro",
            drawed: false
        });
        this.add("animation");
        this.totalTime = 0;
    },
    step: function (dt){
        if (this.totalTime == 0) {
            this.play("intro1");
        }else if(this.totalTime > 10.3){
            this.play("fin");
        }
    }
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

Q.scene('introScene',function(stage) {
    var container = stage.insert(new Q.UI.Container({
        //asset:  "InitScreen/KirbyNES04.png",
        x: 200,
        y: 200,
        h: 180,
        w: 180,

    }));

    stage.insert(new Q.introEntity(), container);
    Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
        //Q.audio.stop("sonido_logotipo_intro.ogg");
        Q.clearStages();
        Q.stageScene('level');
    });
});
