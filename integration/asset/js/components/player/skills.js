class Skills {
    constructor(data) {
        // Set by a Method below.
        this.player;

        this.abilities = {
            [SKILL_NAME.Heal]: {
                value: data.heal.value,
                cooldown: data.heal.cooldown,
                cooldownRemaining: data.heal.cooldownRemaining,
                flag: true,
                factory: {
                    condition: this.isHealActive.bind(this),
                    operation: this.doHealOperation.bind(this)
                }
            },
            [SKILL_NAME.Run]: {
                value: data.run.value,
                duration: data.run.duration,
                durationRemaining: data.run.durationRemaining,
                cooldown: data.run.cooldown,
                cooldownRemaining: data.run.cooldownRemaining,
                flag: true,
                factory: {
                    condition: this.isRunActive.bind(this),
                    operation: this.doRunOperation.bind(this),
                    cooldownEffect: this.doRunCooldownEffect.bind(this)
                }
            },
            [SKILL_NAME.Teleport]: {
                range: data.teleport.range,
                cooldown: data.teleport.cooldown,
                cooldownRemaining: data.teleport.cooldownRemaining,
                flag: true,
                factory: {
                    condition: (mapSize) => this.isTeleportActive(mapSize),
                    operation: this.doTeleportOperation.bind(this)
                }
            }
        };
    }

    setPlayer(player) {
        this.player = player;
    };

    useSkill(skill, mapSize) {
        if (this.abilities[skill].factory.condition(mapSize)) {
            this.abilities[skill].flag = false;
            this.abilities[skill].factory.operation();
            this.isCooldownEffectPresent(skill) ? this.skillInterval(skill, () => this.abilities[skill].factory.cooldownEffect()) : this.skillInterval(skill);
        };
    };

    skillInterval(skill, operation) {
        const cooldownInterval = setInterval(() => {
            if (operation) { operation() };
            this.abilities[skill].cooldownRemaining = Math.max(0, this.abilities[skill].cooldownRemaining - 100);
            if (this.is_ability_cooldown_remaining_below_equal_zero(skill)) {
                clearInterval(cooldownInterval);
                this.reset_skill(skill);
                this.reset_skill_cooldown(skill);
                if(operation) {
                    this.doRunCooldownEffectReset();
                }
            };
        }, 100);
    }

    doTeleportOperation() {
        customLog(`SKILL: Teleported from (${this.player.x}, ${this.player.y}).`);
        this.player.x = MOUSE.x;
        this.player.y = MOUSE.y;
        customLog(`SKILL: Teleported to (${this.player.x}, ${this.player.y})`);
    }

    doRunOperation() {
        customLog(`SKILL: Speed increased from (${this.player.speedUp}).`);
        this.player.speedUp += this.abilities[SKILL_NAME.Run].value;
        this.player.speedDown += this.abilities[SKILL_NAME.Run].value;
        this.player.speedLeft += this.abilities[SKILL_NAME.Run].value;
        this.player.speedRight += this.abilities[SKILL_NAME.Run].value;
        customLog(`SKILL: Speed increased to (${this.player.speedUp}).`);
    }

    doRunCooldownEffect() {
        this.abilities[SKILL_NAME.Run].duration = Math.max(0, this.abilities[SKILL_NAME.Run].duration - 100);
        if (this.is_run_cooldown_effect_expired()) {
            this.reset_player_speed()
        };
    }

    doRunCooldownEffectReset() {
        if (this.is_run_cooldown_effect_expired()) {
            this.abilities[SKILL_NAME.Run].duration = this.abilities[SKILL_NAME.Run].durationRemaining;
        };
    }

    doHealOperation() {
        if ((this.player.hpMax - this.player.hp) < this.abilities[SKILL_NAME.Heal].value) {
            customLog(`SKILL: healed for ${this.player.hpMax - this.player.hp}.`)
            this.player.hp += this.player.hpMax - this.player.hp
        } else {
            this.player.hp += this.abilities[SKILL_NAME.Heal].value
        }
    }

    is_run_cooldown_effect_expired(){
        return this.abilities[SKILL_NAME.Run].duration == 0
    }

    isCooldownEffectPresent(skill) {
        return typeof this.abilities[skill].factory.cooldownEffect === 'function' ? true : false;
    }

    isTeleportActive(mapSize) {
        return this.isTeleportKeyDown() && this.isMouseWithinCanvas(mapSize);
    }

    isTeleportKeyDown() {
        return this.abilities[SKILL_NAME.Teleport].flag && this.player.controls.skills.teleport;
    }
    
    isMouseWithinCanvas(mapSize) {
        return MOUSE.x > 0 && MOUSE.y > 0 && MOUSE.x < mapSize.width && MOUSE.y < mapSize.height;
    }

    is_ability_cooldown_remaining_below_equal_zero(skill){
        return this.abilities[skill].cooldownRemaining <= 0
    }

    isRunActive() {
        return this.abilities[SKILL_NAME.Run].flag && this.player.controls.skills.run;
    }

    isHealActive() {
        return this.abilities[SKILL_NAME.Heal].flag && this.player.controls.skills.heal && this.player.hp < this.player.hpMax;
    }

    reset_skill(skill){
        return this.abilities[skill].flag = true;
    }

    set_skill(skill){
        return this.abilities[skill].flag = true;
    }

    reset_skill_cooldown(skill){
        return this.abilities[skill].cooldownRemaining = this.abilities[skill].cooldown;
    }

    reset_player_speed(){
        this.player.speedUp = Math.max(this.player.speedBase, this.player.speedUp - this.abilities[SKILL_NAME.Run].value);
        this.player.speedDown = Math.max(this.player.speedBase, this.player.speedDown - this.abilities[SKILL_NAME.Run].value);
        this.player.speedLeft = Math.max(this.player.speedBase, this.player.speedLeft - this.abilities[SKILL_NAME.Run].value);
        this.player.speedRight = Math.max(this.player.speedBase, this.player.speedRight - this.abilities[SKILL_NAME.Run].value);
    }
}