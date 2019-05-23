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

        this.add("Entity");

        this.isEntity = false;

        this.on("bump", this, "collision");

    },

    collision: function(collide){
        if(collide.obj.isA("Kirby") && Q.inputs["balloon"]){
            this.destroy();
            Q.state.inc("level", 1);
            Q.stageScene(`level${Q.state.get("level")}`, 0);
            
        }
    }
});





