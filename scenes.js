compiling.level.push(
    {"level1": "level.tmx"}
);

Q.scene("level1", function(stage) {
    
    Q.stageTMX("level.tmx", stage);
    stage.add("viewport").follow(Q('Kirby').first(), {x: true, y: true},{
        minX: 0,
        /*maxX: 60 * 34,*/
        /*minY: 0, */
        /*maxY: 0,*/
    });
});