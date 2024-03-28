class Portal extends Npc {
    constructor(data, player) {
        super(data);
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.player = player;
        this.color = data.color;
        this.imgSrc = data.img;
        this.img = new Image();
        this.img.src = this.imgSrc;
    }

    update() {
        if (this.player.controls.interact && UTILS.overlap(this.player, this)) {
            this.interact = true;
        }
    };

    draw() {
        this.colission(this.player, {collide: false});
        CTX.drawImage(this.img, this.x, this.y);
    }
}