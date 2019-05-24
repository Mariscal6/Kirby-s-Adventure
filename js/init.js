// --------------------
window.onload = function(){

    load(function(){
        
        // Modo Debug
        Q.debug = false;
        //Q.stageScene(Q.state.get("current_level"));
        Q.clearStages();
        Q.stageScene("introScene", 0);
        
        /* Input Controller */

        Q.input.bindKey("Z", "attack");
        Q.input.bindKey("X", "highJump");
        Q.input.bindKey("UP", "balloon");
        Q.input.bindKey("DOWN", "bend");
        Q.input.bindKey("LEFT", "left");
        Q.input.bindKey("RIGHT", "right");

    });
}