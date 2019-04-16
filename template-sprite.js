// ----------------- Template

/* Load Sound */
/*compiling.audio.push({
    "kirby_run": "./run_kirby.mp3",
    "kirby_dance": "./kirby_dance.mp3"
});*/

/* Load Sprite */
compiling.sheet.push({
    "png_path": "<png_path>",
    "json_path": "<json_path>"
});

/* Animations */
Q.animations("<AnimationName>", {

});

/* Object */
Q.sprite.extend("<ObjectName>", {

    init: function(p){

        this._super(p, {

        });

        this.add("2d, animation");

    }


});


