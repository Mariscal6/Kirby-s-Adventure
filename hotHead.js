/* Load Sprite */
compiling.sheet.push({
    "png_path": "hotHead.png",
    "json_path": "hotHead.json"
});


/* Animations */
Q.animations("hotHead", {
    idle: {
        frames: [0,1],
        rate: 1/ 3,
        flip: false, 
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    idleR: {
        frames: [0,1],
        rate:1 / 3,
        flip: "x", 
        collision_box: {
            width: 38,
            height: 32,
        }
    },
    die:{
        frames: [2,3,4],
        rate:1 / 10,
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */

const HOTHEAD_STATE = {
    IDLE: 0,
    IDLER: 1,
    ATTACK: 2,
    DIE: -1,
};

Q.Sprite.extend("HotHead", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "hotHead",
            sprite: "hotHead",
            isStatue: false,
            vx: 30,
            direction: "left",
            flip: "x",
            skipCollision: false,
            gravity: 1,

        });
        this.state = HOTHEAD_STATE.IDLE;

        this.add("Entity, aiBounce");

        /* Events */
        this.on("attack", this, "attack");
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){
            if(collision.obj.isA("Hill")){
                this.p.vy=-200;
            }
            if(collision.obj.isA("Kirby")){
                if(collision.obj.state === KIRBY_STATE.SLIDING ){
                    //this.trigger("cplay", "die");
                    //this.p.vy=-500;
                    this.trigger("cplay", "die");
                    console.log("hola");
                    this.p.isStatue = true;
                    this.gravity=false;
                    this.p.vx=0;
                   // this.p.skipCollision=false;
                    //this.p.y=0;
                    //setTimeout(function(){},5000);
                    //this.destroy();
                }
                else{
                //collision.obj.
                this.p.vy=-500;
                this.p.direction = (this.p.direction === "left") ? "right" : "left";
                }
                //collision.obj.destroy();
            }
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





