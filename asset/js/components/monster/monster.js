class Monster
{
    constructor(x, y, width, height, color, speed, hp, damage)
    {
        this.x = x,
        this.y = y,
        this.width = width;
        this.height = height;
        this.speed = speed,
        this.damage = damage,
        this.hp = hp;
        this.hpMax = hp;
        this.hpBarWidth = this.width / this.hp
        this.vector = {};
        this.color = color;
    }

    draw()
    {
        CTX.fillStyle = this.color;
        CTX.fillRect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = "black";
        CTX.fillRect(this.x -1, this.y + this.height + 3, this.hpMax * this.hpBarWidth + 2, 6);
        CTX.fillStyle = "red";
        CTX.fillRect(this.x, this.y + this.height + 4, this.hp * this.hpBarWidth, 4);
    }

    update(player)
    {
        this.vector = UTILS.unit_vector(player, this);
        this.x += this.vector.nx * this.speed;
        this.y += this.vector.ny * this.speed;
    }
}