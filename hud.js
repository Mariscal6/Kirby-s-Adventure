

Q.scene("HUD", function(stage) {
    
    var container = stage.insert(new Q.UI.Container({
        fill: "pink",
        border: 5,
        w: 800,
        h: 150,
        y: 470,
        x: 400
    }));

    var info = stage.insert(new Q.UI.Container({
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
        asset: "powersHUD.png",
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
    }));
  

    //stage.insert(new Q.Lifes(), lifes);
    stage.insert(power, container);
    stage.insert(new Q.UI.Button({
        asset: "powersHUD.png",
        x: 0,
        y: 0,
        scale: 1.5,
        scaleToFit:true
    }), power);

   // var aux = new Q.PruebaDos();
    //Aun queda... no toqueis
    stage.insert(new Q.UI.Button({
      init: function(p){  
        this.super({ 
            //label: "nada",
            size: 20,
            scaleToFit: true,
            asset: "lifes2.png"});
    }, 
    step: function(){
        //console.log(this.p.asset);
        this.p.asset = "lifes2.png";
        sleep(1000);
       // console.log(this.p.asset);
        this.p.asset = "lifes1.png";
        sleep(1000);
    }), lifes);

});


Q.UI.Text.extend("Lifes",{
    init: function(p){
        this._super({
            label: "Lifes X            ",
            color: "black",
            asset: "kirby.png",
            x: 0,
            y: 0,
            size: 20,
            weight:800,
            family: 'myFirstFont',
        });
    },
    step: function(){
       this.p.label = "Lifes X   " + "10";
       //Bucle constante.
      // console.log("hace cosas");
    }
});

Q.animations("kirby", {
    move:{frames: [4, 3, 2], 
        rate:1 / 10,
    }
});

Q.UI.Button.extend("AnimationLifes", {
            asset: "kirby.png",
            x:0,
            y:0
});

Q.UI.Text.extend("PruebaDos",{
    init: function(p){
        this.super({
            lablel: "funciona",
            size: 20,
            weight: 800
        });
    },
    step: function(){

    }
});