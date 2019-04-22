// --------------------
load(function(){
    
    // Modo Debug
    Q.debug = true;

    //Q.setImageSmoothing(false);
    Q.stageScene("level1");

    /* Input Controller */
    Q.input.bindKey("X", "highJump");
    Q.input.bindKey("UP", "balloon");

});