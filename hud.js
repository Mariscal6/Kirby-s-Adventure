
/*compiling.sheet.push({
    "png_path": "powersHUD.png",
    "json_path": "powers.json"
});
*/

/**/
compiling.sheet.push({
    "png_path": "HUD/hudKirby.png",
    "json_path": "hud.json"
}); 

compiling.sheet.push({
    "png_path": "HUD/lifes.png",
    "json_path": "hud.json"
});

Q.animations("kirby_moves", {
    move:{
        frames: [4, 3, 2],
        rate: 1/5
    }
});

Q.animations({
    normal:{
        frames: [0,1,2],
        rate: 1/5
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
Q.Sprite.extend("MainHUD", {
    init: function(p){
        this._super(p, {
            sprite: "hud",
            x:0,
            y:0
        });
        this.add('animation');
    },
    step: function(){

    }
});



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
    
    var container = stage.insert(new Q.UI.Container({
        fill: "pink",
        border: 5,
        w: 800,
        h: 150,
        y: 470,
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
    }));

    var lifes = stage.insert(new Q.UI.Container({
        fill: "yellow",
        border: 5,
        w: 125,
        h: 80,
        y: 470,
        x: 710
    }));*/
  
    //stage.insert(new Q.MainHUD(), container);
    //stage.insert(new Q.Vidas(), lifes);  
   // stage.insert(new Q.Powers_Kirby(), power);

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
