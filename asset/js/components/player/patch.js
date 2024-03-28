class Patch extends Player {
    constructor(skills, inventory, attributes) {
        super(attributes);

        this.skills = skills;
        this.inventory = inventory;
        this.currentWeapon = this.inventory.arsenal[this.inventory.activeItemn];
        this.color = "darkred";
        this.buffer = 8;
        this.bufferTop = 64;
        
        this.animation = {
            size: {
                width: 32,
                height: 37
            },
            frameIndex: 0,
            frameIndexMax: 6,
            left: new Image(),
            right: new Image(),
            up: new Image(),
            down: new Image(),
            leftDown: new Image(),
            leftUp: new Image(),
            rightUp: new Image(),
            rightdown: new Image()
        };

        this.animation.left.src = attributes.animation.left;
        this.animation.right.src = attributes.animation.right;
        this.animation.up.src = attributes.animation.up;
        this.animation.down.src = attributes.animation.down;
        this.animation.leftDown.src = attributes.animation.leftDown;
        this.animation.leftUp.src = attributes.animation.leftUp;
        this.animation.rightUp.src = attributes.animation.rightUp;
        this.animation.rightdown.src = attributes.animation.rightdown;
        this.currentSprite = this.animation.down;
        this.animationIndex = ['right','rightdown','down','leftDown','left','leftUp','up','rightUp'];
        this.direction;

        this.moving = false; 
    }

    animation

    draw(mapSize, buffer) {


        // CTX.fillStyle = this.color;
        // CTX.fillRect(this.x, this.y, this.width, this.height);
        if(this.currentSprite) {
            CTX.drawImage(
                this.currentSprite, 
                this.animation.size.width * this.animation.frameIndex, 
                48-37,
                this.animation.size.width, 
                this.animation.size.height, 
                this.x, 
                this.y, 
                this.width, 
                this.height);
        }

        // Here because we want to teleport before drawing in the same frame.
        this.skills.useSkill(SKILL_NAME.Teleport, mapSize);
        this.movement(mapSize, buffer);
    };

    update(frames) {
        this.animation_direction();
        this.animation_frame_counter(frames)
        this.animation_current_sprite();
        this.skills.useSkill(SKILL_NAME.Heal);
        this.skills.useSkill(SKILL_NAME.Run);
    };

    movement(mapSize, buffer) {
        if (this.controls.movement.up && this.y - this.speedUp > 0 + buffer.top) { this.y -= this.speedUp; };
        if (this.controls.movement.down && this.y + this.speedDown < (mapSize.height - this.height - buffer.top)) { this.y += this.speedDown; };
        if (this.controls.movement.left && this.x - this.speedLeft > 0 + buffer.sides) { this.x -= this.speedLeft; };
        if (this.controls.movement.right && this.x + this.speedRight < (mapSize.width - this.width - buffer.sides)) { this.x += this.speedRight; };
    };

    animation_direction() {
        let angle = Math.atan2(MOUSE.y - this.y, MOUSE.x - this.x);
        let degrees = angle * (180 / Math.PI);
        if (degrees < 0) {
            degrees += 360; 
        };
        this.direction = Math.round(degrees / 45) % 8;
    }
    animation_frame_counter(frames){
        if (frames % 10 == 0) {
            this.animation.frameIndex = (this.animation.frameIndex + 1) % this.animation.frameIndexMax;
        }
    }
    
    animation_current_sprite(){
        this.moving = this.animation_is_player_moving();
        this.animation_reset_sprite_frames_if_running();
        this.currentSprite = this.animation[this.animationIndex[this.direction]];
    }

    animation_is_player_moving(){
        for (const moving in this.controls.movement) {
            if(this.controls.movement[moving]){
                return true;
            }
        };
        return false;
    }

    animation_reset_sprite_frames_if_running(){
        if (this.moving) {
            this.animation.frameIndexMax = 12;
            if (this.animation.frameIndex < 7) {
                this.animation.frameIndex = 7;
            }
        } else if (!this.moving){
            this.animation.frameIndexMax = 6;
            if(this.animation.frameIndex > 6) {
                this.animation.frameIndex = 0;
            }
            
        }
    }
}