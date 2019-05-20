// ----------------- Entity

Q.component("Entity", {
     //Hill
    added: function(){
        this.entity.add("animation, 2d");

        this.entity.isEntity = true;
        
        this.entity.on("change_state", this, "change_state");
        this.entity.on("cplay", this, "play");

        this.entity.isClimbing = false;
    },

    change_state: function(state){
        if(this.entity.state !== state){
            this.entity.blinkTime = 0;
            this.entity.absorbTime = 0;
            
            this.entity.last_state = this.entity.state;
            this.entity.state = state;
        }
    },

    // Override Play
    play: function(str){
        const entity = this.entity;
        entity.play(str);
        /*
            Optimization:
                - We are not changin all the time the collision box, just when the
                - animation did.
        */
        if(entity.last_animation != str){
            entity.last_animation = str;
            // left top
            const box = Q.animation(entity.p.sprite, str).collision_box;
            //console.log(box);
            const hw = box.width >> 1, hh = box.height >> 1;

            // Translate the height center to the new size.
            entity.p.y += entity.p.points[2][1] - hh;
            
            // left top
            [entity.p.points[0][0], entity.p.points[0][1]] = [-hw, -hh];
            // right top
            [entity.p.points[1][0], entity.p.points[1][1]] = [+hw, -hh];
            // left bottom
            [entity.p.points[2][0], entity.p.points[2][1]] = [+hw, +hh];
            // right bottom
            [entity.p.points[3][0], entity.p.points[3][1]] = [-hw, +hh];
            
        }
    }
});