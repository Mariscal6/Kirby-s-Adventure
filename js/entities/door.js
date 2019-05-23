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

        this.time = 0;
    },

    collision: function(collide){
        if(collide.obj.isA("Kirby") && Q.inputs["balloon"]){
            collide.obj.trigger("change_state", KIRBY_STATE.BYE);
        }
    }
});





