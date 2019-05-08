Q.Sprite.extend("Enemy", {
    
    init: function(p){
       
        this._super(p, {
            isStatue: false,
            vx: 30,
            direction: "left",
            flip: "x",
            skipCollision: false,
            gravity: 1,

        });
    },
    attack: function(){
        
    },
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        if(this.p.isStatue)return;
        
       this.p.direction = (this.p.vx > 0) ? "right" : "left";
       if(this.p.direction === "left"){
        this.p.flip = "x";
        this.p.vx = -30;
        this.trigger("cplay", "idle");
       }else{
        this.p.flip = false;
        this.p.vx = 30;
        this.trigger("cplay", "idleR");
       }

    },

});





