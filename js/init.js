// --------------------
window.onload = function(){

    load(function(){
        
        // Modo Debug
        //Q.debug = true;
        Q.stageScene(Q.state.get("current_level"));

        /* Input Controller */

        Q.input.bindKey("Z", "attack");
        Q.input.bindKey("X", "highJump");
        Q.input.bindKey("UP", "balloon");
        Q.input.bindKey("DOWN", "bend");

    });
}