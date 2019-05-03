//------------- Input Controller
Q.input.on("highJump", function(){
    if(Q('Kirby').first().p.isStatue) return;

    if(Q('Kirby').first().state !== KIRBY_STATE.BALLOON){
        if(!Q.inputs['up']){
            Q.inputs['up'] = true;
            Q("Kirby").first().trigger("highJump");
        }
    }else{
        Q("Kirby").first().trigger("balloon");
    }
   
});

Q.input.on("highJumpUp", function(){
    Q.inputs['up'] = false;
});

/* Balloon Key */
Q.input.on("balloon", function(){
    Q("Kirby").first().trigger("balloon");
});

/* Attack Key */
Q.input.on("attack", function(){
    Q("Kirby").first().trigger("attack");
});

Q.input.on("attackUp", function(){
    Q("Kirby").first().trigger("attack_end");
});