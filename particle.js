// ----------------- Particle

Q.component("Particle", {
    //Hill
   added: function(){
       this.entity.add("Entity");

       this.entity.life = 0;
       this.entity.max_life = 0;
       this.p.gravity = false;
   },
});