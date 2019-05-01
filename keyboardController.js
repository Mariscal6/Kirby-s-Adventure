//------------- Input Controller
Q.input.on("highJump", function(){
    Q("Kirby").first().trigger("highJump");
});                 

/* Balloon Key */
Q.input.on("balloon", function(){
    Q("Kirby").first().trigger("balloon");
});

/* Attack Key */
Q.input.on("attack", function(){
    Q("Kirby").first().trigger("attack");
});