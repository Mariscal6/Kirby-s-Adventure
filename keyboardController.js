//------------- Input Controller
Q.input.on("highJump", function(){
    Q.inputs['up'] = true;
    Q("Kirby").first().trigger("highJump");
});

Q.input.on("highJumpUp", function(){
    Q.inputs['up'] = false;
});


/* Balloon Key */

Q.input.on("balloon", function(){
    Q("Kirby").first().trigger("balloon");
});
