class Flamethrower {
    constructor(magazine, matrix, data) {
        this.component = {
            magazine: magazine,
            matrix: matrix
        };

        this.x;
        this.y;
        this.direction;
        this.shooting = false;

        this.type = data.type;
        this.name = data.name;
    };
    
    priming(monsters, player) {
        if (this.shooting && !this.component.magazine.is_magazine_reload_ongoing()) {
            this.set_shooting_location(player);
            this.set_shooting_direction(player);
            this.set_consume_fuel(monsters);
            this.component.matrix.draw({ x: this.x, y: this.y, direction: this.direction });
            for (const monster of monsters) this.component.matrix.damage_monster_if_colission(monster, { x: this.x, y: this.y, direction: this.direction });

        } else {
            this.shooting = false;
        }
        this.component.magazine.rearm();
    };

    set_shooting_location(player){
        this.x = player.x + player.width / 2;
        this.y = player.y + player.height / 2;
    }

    set_shooting_direction(player){
        this.direction = Math.atan2(MOUSE.y - player.y - player.width / 2, MOUSE.x - player.x - player.height / 2)
    }

    set_consume_fuel() {
        this.component.magazine.remaining = Math.max(this.component.magazine.remaining - this.component.matrix.fuel.consumption, 0)
    };
}