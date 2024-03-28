class Arena extends Scene {
    constructor(data, members, name) {
        super(data, members, name)
        this.audio = new Audio("./asset/music/thedweebman__eerie-tone-music-background-loop.wav")
        this.audio.loop = true;
    };

    setup_members() {
        this.member.player.setup(this.size);
        this.member.monsters.setup(this.size);
        this.member.camera.setup(this.img);
        this.audio.play();
    }

    update() {
        this.member.camera.update();
        this.member.player.update(this.frames);
        this.member.interface.update(this.size);
        this.member.monsters.update(this.frames);
    }

    draw() {
        this.member.camera.draw(this.size);
        if(this.member.player.currentWeapon.type == WEAPON_TYPE.Firearm){
            // Need map size to manage bullets for WEAPON_TYPE.Firearm.
            this.member.player.currentWeapon.priming(this.size, this.member.monsters.list);
        } else if (this.member.player.currentWeapon.type == WEAPON_TYPE.Incendiary) {
            // Need some player data so we know wehre to srart shooting WEAPON_TYPE.Incendiary.
            this.member.player.currentWeapon.priming(this.member.monsters.list, this.member.player);
        };

        this.member.player.draw(this.size, this.buffer);
        this.member.monsters.draw();
        this.member.interface.draw();
        this.frames++;
    };

    addEventListeners() {
        this.member.event.addEventListenersCombat();
    };

    removeEventListeners() {
        this.member.event.removeEventListenersCombat();
    };
};