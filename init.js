// --------------------
load(function(){
    
    // Modo Debug
    //Q.debug = true;
   
    Q.stageScene("level1", 0);
    //Q.debug = false;


    /* Input Controller */

    Q.input.bindKey("Z", "attack");
    Q.input.bindKey("X", "highJump");
    Q.input.bindKey("UP", "balloon");
    Q.input.bindKey("DOWN", "bend");

});