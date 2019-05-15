/* Animations */
Q.Sprite.extend("Hill", {
    init: function (p) {
        this._super(p, {
            sheet: 'tiles',
            y: 400,
            skipCollision: true,
            gravity: false
        });

        this.p.points = [
            [-16, -16],
            [-16, +16],
            [+16, +16],
            [+16, -16],
        ];

        /*if(this.p.Direction === "Right"){
            this.p.points[0][0] -= 10;
            this.p.points[1][0] -= 10;
        }else{
            this.p.points[2][0] += 10;
            this.p.points[3][0] += 10;
        }*/

        this.add('2d, animation');
        
        this.on("bump", this, "hilling");
    },

    "hilling": function(collision){
        const entity = collision.obj;
        if(entity.isParticle || entity.isA("TileLayer") || entity.isA("Hill")) return; // If Particle, avoid

        if(collision.magnitude <= 0){

            const sprite = Q.animation(entity.p.sprite, entity.p.animation).collision_box;

            const feets = entity.p.y + sprite.height / 2;

            const ceil = this.p.y - 16;
            const base = this.p.y + 16;
            
            // Hill's space
            const angle = parseInt(this.p.Angle) * Math.PI / 180;
            const m = Math.tan(angle); // Hill's angle
            const dir = Math.sign(angle); // Direction

            const px = entity.p.x - sprite.width / 2 * dir;
            const dx = this.p.x - 16;
            
            const hx = px - dx; // x in "hill"'s space
            const hy = base - feets; // y in "hill"'s space

            const b = -(dir >= 0) * 32; // b displacement (if angle < 0 => 32 else 0)
            const f = x => m * x + b;
            
            const floor = Math.abs(f(hx));
            //console.log(floor, hy);

            console.log();

            if(floor < hy) return;

            entity.p.y = base - (floor + sprite.width / 2);
            entity.p.vy = 0;

            //const floor = f();
            /*
            
            console.log(fx,  base - feets);
            if(fx > (base - feets)){
                //entity.p.y = base - fx;
            }*/
            //const height = (px - dx);
            //console.log(dx, px);

            //const fx = feets + 

            /*
            const dir = Math.sign(angle);

            
            const dh = (this.p.y + 16) - feets;

            if(dh >= height) return;

            if(height >= 32){
                entity.p.x += 1;
            }
            entity.p.y = clip;
            //entity.p.gravity = false;
            //entity.trigger("change_state", KIRBY_STATE.HILLING);
            */
        }
    }

});