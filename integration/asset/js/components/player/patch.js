class Patch extends Player {
    constructor(skills, inventory, attributes) {
        super(attributes);

        this.skills = skills;
        this.inventory = inventory;
        this.currentWeapon = this.inventory.arsenal[this.inventory.activeItemn];
        this.color = "darkred";
        this.buffer = 8;
        this.bufferTop = 64;
    }

    animation

    draw(mapSize, buffer) {
        CTX.fillStyle = this.color;
        CTX.fillRect(this.x, this.y, this.width, this.height);

        this.skills.useSkill(SKILL_NAME.Teleport, mapSize);
        this.movement(mapSize, buffer);
    };

    update(frames) {
        this.skills.useSkill(SKILL_NAME.Heal);
        this.skills.useSkill(SKILL_NAME.Run);
    };

    movement(mapSize, buffer) {
        if (this.controls.movement.up && this.y - this.speedUp > 0 + buffer.top) { this.y -= this.speedUp; };
        if (this.controls.movement.down && this.y + this.speedDown < (mapSize.height - this.height - buffer.top)) { this.y += this.speedDown; };
        if (this.controls.movement.left && this.x - this.speedLeft > 0 + buffer.sides) { this.x -= this.speedLeft; };
        if (this.controls.movement.right && this.x + this.speedRight < (mapSize.width - this.width - buffer.sides)) { this.x += this.speedRight; };
    };
}