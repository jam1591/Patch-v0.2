class Pistol {
    constructor(magazine, matrix, data) {
        this.component = {
            magazine: magazine,
            matrix: matrix
        };

        // this.trigger = WEAPON_TRIGGER.Manual;
        this.shooting = false;
        this.trigger = false;
        this.type = data.type;
        this.name = data.name;

        this.range = 100;
    };

    priming(size, monsters) {
        this.shoot();
        this.component.magazine.rearm();
        this.component.matrix.draw(size, monsters);
    };

    shoot() {
        if(!this.component.magazine.is_magazine_reload_ongoing())
        {
            if (!this.trigger && this.shooting) {
                this.component.matrix.bullet_add();
                this.component.magazine.decrease_magazine_remaining();
                this.shooting = false;
            }
        };
    };
};