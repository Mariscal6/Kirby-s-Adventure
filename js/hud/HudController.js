function decShield() {
    if (Q.state.get("bar") <= 1) {
        Q.inputKeys = false;
        Q.clearStages();
        Q.state.set("bar", 6);
        
        if (Q.state.get("lifes") <= 1) {
            Q.state.set("lifes", 3);
            Q.state.set("current_level", "level");
            Q.stageScene("fin");
        } else {
            Q.stageScene("deathScene",0);
            Q.state.dec("lifes", 1);
        }
    } else {
        Q.state.dec("bar", 1);
    }
}