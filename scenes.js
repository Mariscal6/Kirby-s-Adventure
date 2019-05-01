compiling.level.push(
    {"level1": "level.tmx"}
);

Q.scene("level1", function(stage) {
    
    Q.stageTMX("level.tmx", stage);
    stage.add("viewport").follow(Q('Kirby').first());
});