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

        if(this.p.Direction === "Right"){
            this.p.points[0][0] += 1;
            this.p.points[1][0] += 1;
        }else{
            this.p.points[2][0] -= 1;
            this.p.points[3][0] -= 1;
        }

        this.add('2d, animation');
        
        this.on("bump", this, "hilling");
    },

    "hilling": function(collision){
        
        if(collision.magnitude <= 0){
            const entity = collision.obj;
            const dir = (this.p.Direction === "Left" ? -1 : 1);
            const dx = this.p.x * dir - 16;
            const px = entity.p.x * dir + 16;
            const height = (px - dx);

            const clip = this.p.y - height;
            const feets = entity.p.y + Q.animation(entity.p.sprite, entity.p.animation).collision_box.height / 2;
            
            if(clip >= feets) return;

            entity.p.y = clip;
            entity.p.gravity = false;
            //entity.trigger("change_state", KIRBY_STATE.HILLING);

        }
    }

});