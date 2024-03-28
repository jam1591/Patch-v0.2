class Bullet {
    constructor(bullet) {
        this.x = SCENE_MANAGER.current.member.player.x + SCENE_MANAGER.current.member.player.width / 2,
        this.y = SCENE_MANAGER.current.member.player.y + SCENE_MANAGER.current.member.player.height / 2,
        this.speed = bullet.speed,
        this.damage = bullet.damage,
        this.width = bullet.size,
        this.height = bullet.size,
        this.color = bullet.color
        this.vector = UTILS.unit_vector(SCENE_MANAGER.current.member.player, MOUSE);
        this.penetration = bullet.penetration;
        this.penetrationCount = bullet.penetrationCount;
    };
    
    draw() {
        CTX.fillStyle = this.color;
        CTX.fillRect(this.x, this.y, this.width, this.height);
    };
    
    update() {
        this.x += (this.vector.nx * -1) * this.speed;
        this.y += (this.vector.ny * -1) * this.speed;
    };
};