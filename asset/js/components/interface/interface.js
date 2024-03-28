class Interface {
    constructor(components, player, canvasSize, optionalCamera = { x: 0, y: 0 }) {
        this.components = components;
        this.player = player;
        this.canvas = {
            width: canvasSize.width,
            height: canvasSize.height
        };
        this.camera = optionalCamera;
        this.uiSkills = {
            size: 30,
            interface: [],
            loadout: 0,
            heightPercentageOfViewport: 0.92,
            widthPercentageOfViewport: 0.435,
            bufferX: 5,
            bufferY: 4,
            color: {
                active: "whitesmoke",
                used: "rgba(0,0,0,0.2)"
            }
        };
        this.uiWeapons = {
            bufferX: 5,
            bufferY: 50,
            width: 1,
            height: 100,
            text: {
                bufferX: 8,
                bufferY: 8,
                color: "#white"
            },
            colorForeground: "#131212",
            colorBackground: "white"
        };
        this.x;
        this.y;
        this.uiHealth = {
            bufferX: 5,
            bufferY: 5,
            height: 15,
            colorForeground: "#131212",
            colorBackground: "#a22d",
            text: {
                color: "white",
                bufferY: 35
            }
        };
    };

    draw() {
        CTX.font = "10px 'Dosis";
        this.skill_draw();
        this.weapon_draw();
        this.health_draw();
    }

    update() {

        this.x = this.camera.x + Math.abs(this.camera.offsetX);
        this.y = this.camera.y + Math.abs(this.camera.offsetY);        
        this.uiSkills.interface = [
            {x: this.x + this.camera.centerX * 0.45, y: this.y + this.camera.centerY * 0.92},
            {x: this.x + this.camera.centerX * 0.50, y: this.y + this.camera.centerY * 0.92},
            {x: this.x + this.camera.centerX * 0.55, y: this.y + this.camera.centerY * 0.92},
        ];
        this.uiSkills.loadout = Object.keys(this.player.skills.abilities);
    }

    health_draw() {
        if (this.components.health) {
            CTX.fillStyle = this.uiHealth.colorForeground;
            CTX.fillRect(this.x + this.uiHealth.bufferX, this.y + this.uiHealth.bufferY, this.player.hpMax, this.uiHealth.height);
            CTX.fillStyle = this.uiHealth.colorBackground;
            CTX.fillRect(this.x + this.uiHealth.bufferX, this.y + this.uiHealth.bufferY, this.player.hp, this.uiHealth.height);
            CTX.fillStyle = this.uiHealth.text.color;
            CTX.fillText(`Score: ${this.player.monsterKillCount}`, this.x + this.uiHealth.bufferX, this.y + this.uiHealth.text.bufferY)

            CTX.font = "20px 'Dosis";
            let textWidth = CTX.measureText(`${this.player.inventory.gold}`).width;
            let positionX = this.x + this.camera.centerX - textWidth - this.uiHealth.bufferX;
            CTX.fillStyle = "#f7ba00";
            CTX.fillText(
                `${this.player.inventory.gold}`, 
                positionX,
                // this.x + this.uiHealth.bufferX + this.camera.centerX - 40, 
                this.y + this.uiHealth.bufferY + this.uiHealth.height)
            CTX.font = "10px 'Dosis";
        }
    }

    weapon_draw() {
        if (this.components.weapon) {
            if (this.player.currentWeapon.component.magazine.reload.type == WEAPON_RELOAD_TYPE.Standard) {
                this.weapon_draw_standard();
            }
            else if (this.player.currentWeapon.component.magazine.reload.type == WEAPON_RELOAD_TYPE.Charge) {
                this.weapon_draw_charge();
            };
        }
    }

    weapon_draw_standard() {
        CTX.fillStyle = this.uiWeapons.colorForeground;
        CTX.fillRect(
            this.x + this.uiWeapons.bufferX,
            this.y + this.uiWeapons.bufferY,
            this.uiWeapons.width,
            this.uiWeapons.height);

        CTX.fillStyle = this.uiWeapons.colorBackground;
        CTX.fillRect(
            this.x + this.uiWeapons.bufferX,
            this.y + this.uiWeapons.bufferY,
            this.uiWeapons.width,
            (this.player.currentWeapon.component.magazine.remaining / this.player.currentWeapon.component.magazine.capacity) * this.uiWeapons.height);

        CTX.fillStyle = this.uiWeapons.text.color;
        CTX.fillText(
            `${this.player.currentWeapon.name}`, 
            this.x + this.uiWeapons.width + this.uiWeapons.text.bufferX, 
            this.y + this.uiWeapons.bufferY + this.uiWeapons.text.bufferY);
    }

    weapon_draw_charge() {
        CTX.fillStyle = this.uiWeapons.colorForeground;
        CTX.fillRect(
            this.x + this.uiWeapons.bufferX,
            this.y + this.uiWeapons.bufferY,
            this.uiWeapons.width,
            this.uiWeapons.height);

        if (this.player.currentWeapon.component.magazine.remaining <= 0) {
            let uiUpdate = this.player.currentWeapon.component.magazine.reload.maxTime / this.uiWeapons.height;
            CTX.fillStyle = this.uiWeapons.colorBackground;
            CTX.fillRect(
                this.x + this.uiWeapons.bufferX,
                this.y + this.uiWeapons.bufferY + (this.player.currentWeapon.component.magazine.reload.time / uiUpdate),
                this.uiWeapons.width,
                this.uiWeapons.height - (this.player.currentWeapon.component.magazine.reload.time / uiUpdate));
        }
        else {
            CTX.fillStyle = this.uiWeapons.colorBackground;
            CTX.fillRect(
                this.x + this.uiWeapons.bufferX,
                this.y + this.uiWeapons.bufferY,
                this.uiWeapons.width,
                (this.player.currentWeapon.component.magazine.remaining / this.player.currentWeapon.component.magazine.capacity) * this.uiWeapons.height);
        };

        CTX.fillStyle = this.uiWeapons.text.color;
        CTX.fillText(
            `${this.player.currentWeapon.name}`, 
            this.x + this.uiWeapons.width + this.uiWeapons.text.bufferX, 
            this.y + this.uiWeapons.bufferY + this.uiWeapons.text.bufferY);
    }

    skill_draw() {
        if (this.components.skill) {
            for (let i = 0; i < this.uiSkills.loadout.length; i++) {
                let details = this.player.skills.abilities[this.uiSkills.loadout[i]];

                if (details.cooldownRemaining == details.cooldown) {
                    CTX.fillStyle = this.uiSkills.color.active;
                    CTX.fillRect(this.uiSkills.interface[i].x, this.uiSkills.interface[i].y, this.uiSkills.size, this.uiSkills.size);
                }
                else {
                    CTX.fillStyle = this.uiSkills.color.used;
                    CTX.fillRect(this.uiSkills.interface[i].x, this.uiSkills.interface[i].y, this.uiSkills.size, this.uiSkills.size);
                    
                };

                CTX.fillStyle = this.uiSkills.color.active;
                CTX.fillText(
                    `${details.cooldownRemaining / 1000} s`,
                    this.uiSkills.interface[i].x + this.uiSkills.bufferX,
                    this.uiSkills.interface[i].y + (this.uiSkills.size / 2) + this.uiSkills.bufferY);
            };

        }
    }
};