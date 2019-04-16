compiling.level.push(
    {"level1": "level.tmx"}
);

Q.scene("level1", function(stage) {
    console.log(1);
    stage.insert(new Q.Kirby());
    Q.stageTMX("level.tmx", stage);
});