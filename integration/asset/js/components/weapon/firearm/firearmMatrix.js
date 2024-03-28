class FirearmMatrix {
    constructor(data) {
        this.name = data.name;
        this.category = {
            type: data.category.type,
            name: data.category.name
        };
        this.baseDamageMultiplier = data.baseDamageMultiplier;

        this.bullets = [];

        this.bullet = {
            speed: data.bullet.speed,
            damage: data.bullet.damage,
            size: data.bullet.size,
            color: data.bullet.color,
            penetration: data.bullet.penetration
        };
    };

    set_constructor(item){
        this.name = item.name;
        this.baseDamageMultiplier = item.baseDamageMultiplier;

        this.bullet = {
            speed: item.bullet.speed,
            damage: item.bullet.damage,
            size: item.bullet.size,
            color: item.bullet.color,
            penetration: item.bullet.penetration
        };
    }

    draw(mapSize, monsters) {
        for (const bullet of this.bullets) {
            this.bullet_remove_out_of_bounds_else_draw(mapSize, bullet);

            for (const monster of monsters) {
                this.monster_do_damage(monster, bullet);
            };
        };
    };

    bullet_remove_out_of_bounds_else_draw(mapSize, bullet){
        if(this.bullet_is_out_of_bounds(bullet, mapSize)){
            this.bullet_remove(bullet);
        } else {
            bullet.draw();
            bullet.update();
        }
    }

    monster_do_damage(monster, bullet) {
        if (UTILS.overlap(monster, bullet)) {
            customLog("BULLET: Monster collision detected.");
            this.monster_hp_decrease(monster, bullet);
            if (!bullet.penetration) { 
                this.bullet_remove(bullet);  
                if(!this.bullets.includes(bullet)) customLog("BULLET: Removed as it has colided with a monster.");
            }
        };
    };

    bullet_add() {
          this.bullets.push(new Bullet(this.bullet));
    };

    bullet_remove(bullet) {
        let index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
        
    };

    monster_hp_decrease(monster, bullet) {
        monster.hp = monster.hp - bullet.damage * this.baseDamageMultiplier < 0 ? 0 : monster.hp - bullet.damage * this.baseDamageMultiplier;
        if(monster.hp < monster.hpMax) customLog("MONSTER: Health reduced.");
    }

    bullet_is_out_of_bounds(bullet, mapSize){
        return ( bullet.x < 0 || bullet.y < 0 || bullet.x + bullet.size > mapSize.width || bullet.y + bullet.size > mapSize.height);
    }
};