class Town extends Scene {
    constructor(data, members, name) {
        super(data, members, name)

        this.audio = new Audio("./asset/music/ezcah__game-townroom-music.wav")
        this.audio.loop = true;
    };

    setup_members() {
        this.member.player.setup(this.size);
        this.member.portal.setup();
        this.member.shop.setup();
        this.member.camera.setup(this.img);
        this.audio.play();
    }

    update() {
        this.member.camera.update();
        this.member.portal.update();
        this.member.shop.update();
        this.member.player.update(this.frames);
        this.member.interface.update(this.size);

    }

    draw() {
        this.member.camera.draw(this.size);
        this.member.portal.draw();
        this.member.shop.draw();
        this.member.player.draw(this.size, this.buffer);
        this.member.interface.draw();
        this.frames++;
    };

    addEventListeners() {
        this.member.event.addEventListenersSafe();
    };

    removeEventListeners() {
        this.member.event.removeEventListenersSafe();
    };
};