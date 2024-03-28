class Player {
    constructor(attributes) {

        this.hp = attributes.hp;
        this.hpMax = attributes.hp;
        this.x;
        this.y;
        this.width = attributes.width;
        this.height = attributes.height;
        this.speedBase = attributes.speed;
        this.speedUp = attributes.speed;
        this.speedDown = attributes.speed;
        this.speedLeft = attributes.speed;
        this.speedRight = attributes.speed;

        this.controls = {
            movement: { up: false, down: false, left: false, right: false },
            skills: { heal: false, run: false, teleport: false },
            interact: false
        };
        this.monsterKillCount = 0;
    }
    
    setup(mapSize){
        this.speedUp = this.speedBase;
        this.speedDown = this.speedBase;
        this.speedLeft = this.speedBase;
        this.speedRight = this.speedBase;
        this.hp = this.hpMax;
        this.x = mapSize.width / 2;
        this.y = mapSize.height / 2;
        this.controls = {
            movement: { up: false, down: false, left: false, right: false },
            skills: { heal: false, run: false, teleport: false },
            interact: false
        };
        if (this.currentWeapon.type == WEAPON_TYPE.Firearm) this.currentWeapon.bullets = [];
        this.currentWeapon.shooting == false;
        this.monsterKillCount = 0;
    }
}