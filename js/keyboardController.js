//------------- Input Controller
Q.input.on("highJump", function(){
    if(!Q.inputKeys || Q('Kirby').first().p.isStatue) return;
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
    if(!Q.inputKeys) return;
    Q.inputs['up'] = false;
});

/* Balloon Key */
Q.input.on("balloon", function(){
    if(Q.handSelection) {
        Q("hand").first().continue = !Q("hand").first().continue;
    }
    if(!Q.inputKeys) return;
    Q("Kirby").first().trigger("balloon");
});

/* Attack Key */
Q.input.on("attack", function(){
    if(!Q.inputKeys) return;
    Q("Kirby").first().trigger("attack");
});

Q.input.on("attackUp", function(){
    if(!Q.inputKeys) return;
    Q("Kirby").first().trigger("attack_end");
});

Q.input.on("bend", function () {
    if(Q.handSelection) Q("hand").first().continue = !Q("hand").first().continue;
    if(!Q.inputKeys) return;
    if (!Q.inputs['down']) {
        Q.inputs['down'] = true;
        Q("Kirby").first().trigger("bend");
    }
});

Q.input.on("bendUp", function(){
    if(!Q.inputKeys) return;
    Q.inputs['down'] = false;
    Q("Kirby").first().trigger("bend_end");
});

// Override Left / Right
const DOUBLECLICK_TIMESPAN = 100;
let delta = 0;
let ldir = "";

function isDoubleClick(dir){
    if(!Q.inputKeys) return;
    const current = new Date().getTime();
    if(ldir == dir && (current - delta) < DOUBLECLICK_TIMESPAN){
        // Double click
        Q("Kirby").first().trigger("run");
    }

    ldir = dir;
}

function isDoubleClickUp(){
    if(!Q.inputKeys) return;
    Q("Kirby").first().isRunning = false;
    delta = new Date().getTime();
}

Q.input.on("left", _ => isDoubleClick("left"));
Q.input.on("leftUp", isDoubleClickUp);

Q.input.on("right", _ => isDoubleClick("right"));
Q.input.on("rightUp", isDoubleClickUp);