/* Animations */
Q.Sprite.extend("Hill", {
    init: function (p) {
        this._super(p, {
            sheet: 'tiles',
            y: 400,
            skipCollision: true,
            gravity: false
        });

        // Set triangle collision
        this.p.points = [
            [-16, +16],
            [+16, +16],
            [+16, -16],
        ];

        // Flip Top Left Corner
        this.p.points[2][0] *= this.p.Direction === "Left" ? -1 : 1;

        this.add('2d, animation');

        this.on("bump.left", "hillLeft");
        this.on("bump.right", "hillRight");
    },

    hillLeft: function(collided){
        const entity = collided.obj;
        if(entity.isA("Hill")) return;
        
        const box_entity = Q.animation(entity.p.sprite, entity.p.animation).collision_box;

        let entity_foot =  entity.p.x + box_entity.width / 2;
        let hill_base = this.p.x - 16;

        entity.p.y -= entity_foot - hill_base;

        entity.isOnHill = true;
        entity.p.angle = 45;
    },

    hillRight: function(collided){

    }

});