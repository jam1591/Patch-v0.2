class MonsterManager {
    constructor(player) {
        this.player = player;
        this.list = [];
        this.map = {
            width: 0,
            height: 0,
        };
        this.grace = 50;

        this.rounds = [
            { width: 55, height: 80, color: "rgba(140, 79, 36, 0.5)", speed: 0.8, hp: 150, damage: 0.6, count: 2},
            { width: 20, height: 20, color: "rgba(0, 0, 0, 0.5)", speed: 1.0, hp: 20, damage: 0.2, count: 15 },
            { width: 10, height: 10, color: "rgba(2, 40, 163, 0.5)", speed: 1.3, hp: 10, damage: 0.4, count: 5 }
        ];

        this.wavesToSpawn = 2;
        this.monstersIncreaseSpawnCount = 2000;
    };

    setup(mapSize) {
        this.list = [];
        this.map = {
            width: mapSize.width,
            height: mapSize.height
        }
    }

    draw() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].draw();
        }
    };

    update(frames) {

        this.monsters_increase_spawn_count(frames);
        
        for (let i = 0; i < this.list.length; i++) {
            this.monster_movement_towards_player(this.list[i], this.player);
            this.monster_damage_player(this.list[i]);
            this.monster_remove_if_hp_zero(this.list[i]);
        }

        this.monsters_add_bulk_using_frames(frames)
    };

    monsters_increase_spawn_count(frames){
        if(frames != 0 && frames % this.monstersIncreaseSpawnCount == 0){
            for (let i = 0; i < this.rounds.length; i++) {
               this.rounds[i].count ++;
            }
        }
    }

    monsters_add_bulk_using_frames(frames) {
        if (frames > this.grace) {
            let count = 0;
            if (this.list.length == 0) {
                while (count < this.wavesToSpawn) {
                    let random = Math.floor(Math.random() * this.rounds.length);
                    for (let i = 0; i < this.rounds[random].count; i++) {
                        console.log(this.rounds[random].count);
                        this.monster_add(
                            this.rounds[random].width,
                            this.rounds[random].height,
                            this.rounds[random].color,
                            this.rounds[random].speed,
                            this.rounds[random].hp,
                            this.rounds[random].damage);
                    }
                    count += 1;
                }
            }
        }
    }

    monster_movement_towards_player(monster, player) {
        monster.update(player);
    }

    monster_damage_player(monster) {
        if (UTILS.overlap(this.player, monster)) { this.player.hp = Math.max(0, this.player.hp - monster.damage) };
    }

    monster_remove_if_hp_zero(monster) {
        if (monster.hp <= 0) {
            this.monster_remove(monster)
            this.player.monsterKillCount++;
            this.player.inventory.gold += UTILS.get_random_number(1, 3);
        };
    }

    monster_remove(monster) {
        let index = this.list.indexOf(monster);
        this.list.splice(index, 1);
    };

    monster_add(width, height, color, speed, hp, damage) {
        this.list.push(new Monster(this.monster_get_x_position(), this.monster_get_y_position(), width, height, color, speed, hp, damage));
    };

    monster_get_x_position() {
        return UTILS.get_random_number(0, this.map.width);
    }

    monster_get_y_position() {
        return UTILS.get_random_number(0, this.map.height);
    }

    is_monster_hp_below_zero(monster) {
        return monster.hp <= 0
    }
};