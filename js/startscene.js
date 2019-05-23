// ------- Kirby Intro
/*compiling.sheet.push({
    "png_path": "kirby_intro_animation.png",
    "json_path": "intro.json"
});*/
Q.animations("intro", {
    idle: {
        frames: (new Array(56)).fill(0).map((e, i) => i),
        rate: 5,
        collision_box: {
            width: 224,
            height: 224,
        }
    }
});
Q.Sprite.extend("introEntity", {
    init: function(p) {
        this._super(p, {
            //asset: "kirby_intro_animation/kirby_0.png",
            x: 292,
            y: 224,
            gravity: 0,
            scale: 1.1,
            opacity: 0
        });
        this.add("animation");
        this.frameTime = 0;
        this.totalTime = 0;
    },
    step: function (dt){
        this.play("intro");
    }
});
