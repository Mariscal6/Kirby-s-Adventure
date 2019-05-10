compiling.level.push(
    {"level1": "level1.tmx"},
    {"level2" : "level2.tmx"}
);
Q.state.set({ score: 10100, lives: 3,  bar: 6, power: "normal", sceneState: "HUD", level: 1});


const init_global_entities = function(stage){
    stage.insert(new Q.Absorb());
};

Q.scene("level1", function(stage) {
    
    Q.stageScene("HUD", 1);
    
    Q.stageTMX("level1.tmx", stage);
    init_global_entities(stage);
    
    stage.add("viewport").follow(Q('Kirby').first(), {x: true, y: true},{
        minX: 0,
        maxX: 32 * 63,
        minY: +210,
        maxY: -100,
    });
    //stage.viewport.offsetY = -700;
   // console.log(stage.options.gridH);
});

Q.scene("level2", function(stage) {
    
    Q.stageScene("HUD", 1);
    
    Q.stageTMX("level2.tmx", stage);
    init_global_entities(stage);
    
    console.log(stage._collisionLayers.c);
    stage.add("viewport").follow(Q('Kirby').first(), {x: true, y: true},{
        minX: 0,
        maxX: 32 * 63,
        minY: +210,
        maxY: -100,
    });
    //stage.viewport.offsetY = -700;
   // console.log(stage.options.gridH);
});
