// --------------------
load(function(){
    
    // Modo Debug
    Q.debug = true;
   
    Q.stageScene("level1", 0);

    Q.stageScene("HUD", 1);
       

    /* Input Controller */
    Q.input.bindKey("Z", "attack");
    Q.input.bindKey("X", "highJump");
    Q.input.bindKey("UP", "balloon");

});