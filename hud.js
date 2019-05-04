

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
        w: 100,
        h: 120,
        y: 470,
        x: 570
    }));

    var lifes = stage.insert(new Q.UI.Container({
        fill: "yellow",
        border: 5,
        w: 125,
        h: 80,
        y: 470,
        x: 710
    }));

   

    stage.insert(new Q.Lifes(), lifes);
    stage.insert(power, container);

});


Q.UI.Text.extend("Lifes",{
    init: function(p){
        this._super({
            label: "Lifes X ",
            color: "blue",
            x: 0,
            y: 0,
            size: 18,
            weight:80,
            family: 'myFirstFont',
        });
    },
    score: function(){
        this.p.label = "Dani mas gordito";
    }
});