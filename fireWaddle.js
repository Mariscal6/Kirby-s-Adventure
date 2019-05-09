/* Load Sprite */
compiling.sheet.push({
    "png_path": "waddle1.png",
    "json_path": "waddle.json"
});


/* Animations */
Q.animations("fireWaddle", {
    fireL:{
        frames: [4],
        rate:1 / 10,
        flip:false,
        collision_box: {
            width: 38,
            height: 32,
        },
    },
    fireR:{
        frames: [4],
        rate:1 / 10,
        flip:"x",
        collision_box: {
            width: 38,
            height: 32,
        },
    }
});

/* Object */


Q.Sprite.extend("FireWaddle", {
    
    init: function(p){
       
        this._super(p, {
            sheet: "waddle",
            sprite: "fireWaddle",
            isStatue: false,
            vx: 30,
            direction: "left",
            flip: false,
            skipCollision: true,
            gravity: false,

        });

        //times
        this.fireTime = 0;
        this.touch=false;
        this.terminate=false;

        this.add("Entity, aiBounce");

        /* Events */
        this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision){
            if(collision.obj.isA("Kirby")){
                console.log(this);
               this.touch = true;
               this.terminate=true;  
               this.destroy();
            }
        });

    },
  
    // Update
    update: function(dt){
        this._super(dt);
    },

    // Update Step
    step: function(dt){
        if(this.touch) return
        this.fireTime += dt;
        if(this.fireTime > 2){
            this.terminate=true;
            this.fireTime = 0;
            this.destroy();
        }
    },

});





