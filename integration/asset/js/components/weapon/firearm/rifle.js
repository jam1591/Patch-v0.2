class Rifle {
    constructor(magazine, matrix, data) {
        this.component = {
            magazine: magazine,
            matrix: matrix
        };

        // this.trigger = WEAPON_TRIGGER.Manual;
        this.automaticInterval = null;
        this.automaticBulletSpacing = 75;
        this.shooting = false;
        this.trigger = true;
        this.type = data.type;
        this.name = data.name;
    };

    priming(size, monsters) {
        this.shoot();
        this.component.magazine.rearm();
        this.component.matrix.draw(size, monsters);
    };

    shoot() {
        if (!this.component.magazine.is_magazine_reload_ongoing()) {
            if (this.trigger && this.shooting && !this.component.magazine.reload.ongoing && this.component.magazine.remaining > 0) {
                if (!this.automaticInterval) {
                    this.automaticInterval = setInterval(() => {
                        if (this.shooting && this.component.magazine.remaining > 0 && !this.component.magazine.reload.ongoing) {
                            this.component.matrix.bullet_add();
                            this.component.magazine.decrease_magazine_remaining();
                        } else {
                            clearInterval(this.automaticInterval);
                            this.automaticInterval = null;
                            this.shooting = false;
                        }
                    }, this.automaticBulletSpacing);
                };
            };
        };
    };
};