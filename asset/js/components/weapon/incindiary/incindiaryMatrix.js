class IncendiaryMatrix
{
    constructor(data) {
        this.name = data.name;
        this.category = {
            type: data.category.type,
            name: data.category.name
        };
        this.fuel = new Fuel(data.fuel);

        this.angle_in_degrees = data.angle_in_degrees;
        this.angle_in_radians = this.angle_in_degrees * (Math.PI / 180);
        this.radius = data.radius;
        this.thermalDamage = data.thermalDamage;
    };

    set_constructor(item){
        this.name = item.name;
        this.angle_in_degrees = item.angle_in_degrees;
        this.radius = item.radius;
        this.thermalDamage = item.thermalDamage;
    }

    draw(weapon){
        CTX.beginPath();
        CTX.fillStyle = this.fuel.color;
        CTX.arc(weapon.x, weapon.y, this.radius, weapon.direction+ this.angle_in_radians, weapon.direction - this.angle_in_radians, true);
        CTX.lineTo(weapon.x, weapon.y);
        CTX.closePath();
        CTX.stroke();
        CTX.fill();
    }

    damage_monster_if_colission(monster, weapon) 
    {
        if (this.is_collision_with_monster(monster, weapon)) { this.decrease_monster_health(monster) };
    };

    is_collision_with_monster(monster, weapon) {
        let distanceX = (monster.x + (monster.width / 2)) - weapon.x;
        let distanceY = (monster.y + (monster.height / 2)) - weapon.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let cosDirection = Math.cos(weapon.direction);
        let sinDirection = Math.sin(weapon.direction);
        let projectedDistance = distanceX * cosDirection + distanceY * sinDirection;
            if (distance <= this.radius) {
            let distanceToEdge = Math.abs(distanceX * sinDirection - distanceY * cosDirection);
            if (distanceToEdge <= projectedDistance * Math.tan(this.angle_in_radians)) {
                return true;
            }
        }
        return false;
    }

    
    decrease_monster_health(monster){
        monster.hp -= Math.max(0, this.set_thermal_damage())
    }

    set_thermal_damage(){
        return this.thermalDamage + this.fuel.flammability;
    }
};