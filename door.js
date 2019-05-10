/* Load Sprite */

Q.Sprite.extend("Door", {
    
    init: function(p){
        this._super(p, {
            sheet: 'tiles',
            frame: 0, 
            isStatue: true,
            skipCollision: true,
            gravity: 0,
        });
        this.time = 0;
        this.add("Entity, aiBounce");

        this.on("bump", function(collision){
            if(++this.time >= 70){
                Q.state.inc("level", 1);
                Q.stageScene(`level${Q.state.get("level")}`, 0);
            }
        });

    },
});





