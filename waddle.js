/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle1.png",
    "json_path": "waddle.json"
});


/* Animations */
Q.animations("waddle", {
    idle: {
        frames: [0,1],
        rate:1 / 10,
        flip: false, 
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    idleR: {
        frames: [0,1],
        rate:1 / 10,
        flip: "x", 
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    die:{
        frames: [0],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */


Q.Sprite.extend("Waddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "waddle",
            isStatue: false,
            vx: 30,
            direction:"left",
            flip:"x",
            skipCollision: false,
            gravity:1,
        });


        this.add("Entity, aiBounce");

        /* Events */
       
        this.on("attack_end", this, "attack_end");
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){
            if(collision.obj.isA("Hill")){
                this.p.vy=-200;
            }
            if(collision.obj.isA("Kirby")){
                if(collision.obj.state === KIRBY_STATE.SLIDING ){
                    //this.trigger("cplay", "die");
                    this.p.vy=-500;
                    this.gravity=2;
                    this.p.skipCollision=true;
                    //setTimeout(function(){},5000);
                    //this.destroy();
                }
                else{
                this.p.vy=-500;
                this.p.direction = (this.p.direction === "left") ? "right" : "left";
                }
                //collision.obj.destroy();
            }
        });

    },
    attack_end: function(){

        this.absorbType = ABSORB_TYPE.BLOWING;

    },
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
    
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





