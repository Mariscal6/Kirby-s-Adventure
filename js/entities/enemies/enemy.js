// ----------------- Enemy

const ENEMY_STATE = {
    DIE: -1,
    IDLE: 0,
    ATTACKING: 1,
    JUMPING: 2,
    ABSORBED: 3,
};

Q.component("Enemy", {
    //Hill
    added: function(){
        this.entity.add("Entity, aiBounce");

        this.entity.on("step", this, "step");
        this.entity.on("bump", this, "collision");
        this.entity.on("draw", this, "draw");
        this.entity.on("destroy", this, "destroy");

        // Global events
        this.entity.on("attack", this.entity, "attack");

        // Properties
         // Remove initial velocity
        this.entity.p.vy = 0.0;
        this.entity.p.vx = 0.0;
        this.entity.p.gravity = false;

        // States
        this.entity.state = ENEMY_STATE.IDLE;

        this.entity.time_idle = 0.0;

        // Attack
        this.entity.time_attack = 0.0;
        this.entity.attack_duration = 0.0;
        this.entity.attack_cycle = 0.0;
        this.entity.num_attacks = 1;
        this.entity.current_attack = 0;

        // Jump
        this.entity.time_jump = 0.0;
        this.entity.jump_cycle = 0.0;
        this.entity.jump_high = 0.0;

        // Velocity
        this.entity.p.speed = 50;

        // Dead
        this.entity.timeDead = 0.0;

        //Hit booss
        this.entity.hitBossTime = 30;

        this.entity.isEnemy = true;
        this.entity.timeInvencible = 0;
    },

	draw: function(){
	},

    collision: function(collision){
        const entity = collision.obj;
        this.entity.hitBossTime++;
        if(collision.obj.isA("TileLayer") || this.entity.state === ENEMY_STATE.ABSORBED || this.entity.state === ENEMY_STATE.DIE) return;
        if(entity.isA("AbsorbMissile") && !this.entity.isBoss){
			this.entity.trigger("change_state", ENEMY_STATE.ABSORBED);

			/*const direction = this.entity.p.flip === "x" ? -1 : 1;
			const ix = this.p.x + direction * w / 2;
			const ex = this.entity.p.x;*/
			//this.p.vx = 
		}else if(entity.killEnemy){
            
            if(this.entity.isBoss &&  this.entity.timeInvencible <= 0){
                Q.state.dec("bossHEALTH", 1);
                this.entity.timeInvencible = 0.5;
            }else if(!this.entity.isBoss){
                Q.state.inc("score", 1000);
                this.entity.trigger("change_state", ENEMY_STATE.DIE);
            }
        }
       /*
        if(collision.obj.isA("Kirby")){

            this.attackTime=0;
            if(collision.obj.state === KIRBY_STATE.SLIDING ){
                this.trigger("change_state", WADDLE_STATE.DIE);
            }
            else{
                if(!this.skipCollision){Q.state.set("bar", Q.state.get("bar") - 1);}
                this.trigger("change_state", WADDLE_STATE.DIE);
            }
        }
        if(collision.obj.isA("FireWaddle")){
            this.p.flip=this.flipActual;
        }
        */
    },

    destroy: function(){
        console.log(1);
    },

    step: function(dt){

		const self = this.entity;

        self.timeInvencible -= dt;
        self.p.gravity = 0.89;
        self.p.skipCollision = false;
        
        switch(self.state){
			case ENEMY_STATE.IDLE:
                self.trigger("cplay", "idle");
                
                self.p.direction = (self.p.vx >= 0) ? "right" : "left";
                self.p.vx = self.p.speed * ((self.p.direction === "left") ? -1 : 1);

                self.time_idle += dt;
                self.time_jump += dt;

                if(self.time_idle >= self.attack_cycle){
                    self.time_idle = 0.0;
                    self.current_attack = 0;
                    self.trigger("change_state", ENEMY_STATE.ATTACKING);
                }else if(self.time_jump >= self.jump_cycle){
                    self.time_jump = 0.0;
                    self.p.vy -= self.jump_high;
                    self.trigger("change_state", ENEMY_STATE.JUMPING);
                }
            break;
            case ENEMY_STATE.ATTACKING:
                
                self.trigger("cplay", "attack");

                self.p.vx = 0.0;
                self.p.vy = 0.0;
                
                if(self.time_attack > ((self.attack_duration / self.num_attacks) * self.current_attack)){
                    ++self.current_attack;
                    self.trigger("attack");
                }
                
                self.time_attack += dt;
                if(self.time_attack >= self.attack_duration){
                    self.time_attack = 0.0;
                    self.trigger("change_state", ENEMY_STATE.IDLE);
                }

            break;
            case ENEMY_STATE.JUMPING:
                
                self.trigger("cplay", "jump");

                if(self.p.vy === 0){
                    self.time_jump = 0.0;
                    self.trigger("change_state", ENEMY_STATE.IDLE);
                }

			break;
			case ENEMY_STATE.ABSORBED:

				self.trigger("cplay", "idle");

				const absorb = Q("AbsorbMissile").first();

				if(!absorb.onScreen){
					self.p.skipCollision = false;
                    self.trigger("change_state", ENEMY_STATE.IDLE);
				}else{
					const ct = Q.animation(self.p.sprite, self.p.animation).collision_box;
					const ce = Q.animation(absorb.p.sprite, absorb.p.animation).collision_box;
					
					const dir = (absorb.p.flip === "x" ? 1 : -1);
					const mouth = absorb.p.x + ce.width * dir / 2;
					const side = self.p.x + ct.width * dir / 2;

					const ivelocity = 0.3;
					let dx = (mouth - side); // / ct.width + ivelocity
                    let dy = (absorb.p.y - self.p.y); // / ct.height
                    const ds = Math.sqrt(dx * dx + dy * dy);

                    dx /= ds;
                    dy /= ds;

                    
                    const v = (1 - 1 / (1 + ds*ds)) * 200 + 100;
                    self.p.skipCollision = true;
                    self.p.gravity = false;
                    
                    self.p.vx = dx * v;
					self.p.vy = dy * v;
				}

			break;
            case ENEMY_STATE.DIE:

				self.trigger("cplay", "die");
                
                self.p.vx = 0;
                self.p.vy = 0;
                self.p.skipCollision = true;
                self.p.gravity = false;
                if(self.timeDead === 0){
                    let stars = Q("StarParticle").items;
                    for(let i = 1; i < stars.length; ++i){
                        stars[i].respawn(self, 0.1, 400.0);
                    }

                }else if(self.timeDead >= 1/8){
                    self.destroy();
                }
                self.timeDead += dt;

            break;
        }

        self.p.flip = (self.p.direction === "left") ? false : "x";

    }

});