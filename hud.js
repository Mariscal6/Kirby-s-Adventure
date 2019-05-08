
/*compiling.sheet.push({
    "png_path": "powersHUD.png",
    "json_path": "powers.json"
});
*/

/**/
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
    "png_path": "HUD/healthBar.png",
    "json_path": "health.json"
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
    }
})


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
            x:185 + 35,
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



Q.Sprite.extend("HealthBar", {
    init: function(p){
        this._super({
            sheet: "health",
            sprite: "healthKirby",
            x: 0,
            y:0,
            h: 111,
            w: 335,
        });
        this.add('animation');
    },
    step: function(){
        this.play("shine");
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
    }
});



/*
Q.animations("powers_kirby", {
    normal:{
        frames: [0]
    }
})

Q.Sprite.extend("Vidas", {
    init: function(p){
        this._super(p, {
            sprite: "kirby_moves",
            sheet: "kirby", 
            label: "Prueba",
            x: 0,
            y: 0,
        });
        this.add('animation');
    },
    step: function(){
        this.play("move");
    }
});
;*/



/*Q.Sprite.extend("Powers_Kirby", {
    init: function(p){
        this._super(p, {
            sprite: "powers_kirby",
            sheet: "powers", 
            x: 0,
            y: 0
        });
        this.add('animation');
    },
    step: function(){
        this.play("normal");
    }
});*/



Q.scene("HUD", function(stage) {
    
    var container = stage.insert(new Q.UI.Button({
        fill: "pink",
        border: 5,
        w: 800,
        h: 150,
        y: 497,
        x: 400,
    }));

    /*var info = stage.insert(new Q.UI.Container({
        fill: "yellow",
        border: 5,
        w: 470,
        h: 120,
        y: 470,
        x: 250
    }));

    var power = stage.insert(new Q.UI.Container({
        fill: "red",
        border: 5,
        w: 100,
        h: 120,
        y: 470,
        x: 560
    }));*/

    /*stage.insert(new Q.UI.Button({
        border: 0,
        w: 43,
        h: 32,
        y: 470,
        x: 710,
    }), container);*/
  
  
    stage.insert(new Q.MainHUD(), container);
    //stage.insert(lifes, container);
    stage.insert(new Q.LifesHUD(), container);
    stage.insert(new Q.PowersHUD(), container);
    stage.insert(new Q.HealthBar(),container);
    //stage.insert(new Q.LifesHUD(), lifes);
    //stage.insert(lifes, container);
    

});


Q.UI.Button.extend("AnimationLifes", {
            asset: "kirby.png",
            x:0,
            y:0
});

Q.animations("kirby_moves", {
    move:{
        frames: [4, 3, 2],
        rate: 1/5
    }
});
