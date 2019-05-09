compiling.level.push(
    {"level1": "level.tmx"}
);
Q.state.set({ score: 999999, lives: 3,  bar: 1, power: "back_drop"});


const init_global_entities = function(stage){
    stage.insert(new Q.Absorb());
};

Q.scene("level1", function(stage) {
    


    Q.stageTMX("level.tmx", stage);
    init_global_entities(stage);
    
    stage.add("viewport").follow(Q('Kirby').first(), {x: true, y: true},{
        minX: 0,
        /*maxX: 60 * 34,*/
        /*minY: 0, */
        /*maxY: 0,*/
    });
    console.log(stage.options.gridH);
});

