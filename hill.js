/* Animations */
Q.Sprite.extend("Hill", {
    init: function (p) {
        this._super(p, {
            sheet: 'tiles',
            y: 400,
            /*skipCollision: true,*/
            gravity: false
        });

        // Set triangle collision
        this.p.y -= 1;
        this.p.points = [
            [-16, +17],
            [+16, +17],
            [+16, -17],
        ];

        // Flip Top Left Corner
        this.p.points[2][0] *= this.p.Direction === "Left" ? -1 : 1;

        this.add('2d, animation');
    },

});