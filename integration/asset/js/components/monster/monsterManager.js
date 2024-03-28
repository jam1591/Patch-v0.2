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
            { width: 20, height: 20, color: "rgba(0, 0, 0, 0.5)", speed: 1.5, hp: 20, damage: 0.2, count: 1 },
        ];

        this.wavesToSpawn = 1;
        this.monstersIncreaseSpawnCount = 2000;

        this.testSpawn = false;
        this.testGold = false;
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
            if (!this.testSpawn) {
                this.testSpawn = true;
                while (count < this.wavesToSpawn) {
                    for (let i = 0; i < this.rounds[0].count; i++) {
                        this.monster_add(
                            this.rounds[0].width,
                            this.rounds[0].height,
                            this.rounds[0].color,
                            this.rounds[0].speed,
                            this.rounds[0].hp,
                            this.rounds[0].damage);
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

            let previousGold = this.player.inventory.gold;

            this.player.inventory.gold += UTILS.get_random_number(1, 3);

            if(previousGold < this.player.inventory.gold) customLog("PLAYER: Gained gold.")
        };
    }

    monster_remove(monster) {
        let index = this.list.indexOf(monster);
        this.list.splice(index, 1);
        if(this.list.length == 0) customLog("MONSTER: Removed as health is 0.")
    };

    monster_add(width, height, color, speed, hp, damage) {
        this.list.push(new Monster(410, 0, width, height, color, speed, hp, damage));
        customLog(`MONSTER: X: ${this.list[0].x}, Y: ${this.list[0].y}, Width: ${this.list[0].width}, Height: ${this.list[0].height}`)
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