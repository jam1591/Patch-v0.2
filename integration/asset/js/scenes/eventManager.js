class EvantManager{
    constructor(members, canvas){

        this.member = members;
        this.canvas = canvas;

        this.handleEventListener = {
            boundHandleKeydown: this.handleKeydown.bind(this),
            boundHandleKeyUp: this.handleKeyUp.bind(this),
            boundHandleMouseMove: this.handleMouseMove.bind(this),
            boundHandleMouseUp: this.handleMouseUp.bind(this),
            boundHandleMouseDown: this.handleMouseDown.bind(this)
        };
    }

    addEventListenersCombat() {
        // document.addEventListener("mousemove", this.handleEventListener.boundHandleMouseMove);
        document.addEventListener("keydown", this.handleEventListener.boundHandleKeydown);
        document.addEventListener("keyup", this.handleEventListener.boundHandleKeyUp);
        // document.addEventListener("mousedown", this.handleEventListener.boundHandleMouseDown);
        // document.addEventListener("mouseup", this.handleEventListener.boundHandleMouseUp);
    };


    removeEventListenersCombat() {
        // document.removeEventListener("mousemove", this.handleEventListener.boundHandleMouseMove);
        document.removeEventListener("keydown", this.handleEventListener.boundHandleKeydown);
        document.removeEventListener("keyup", this.handleEventListener.boundHandleKeyUp);
        // document.removeEventListener("mousedown", this.handleEventListener.boundHandleMouseDown);
        // document.removeEventListener("mouseup", this.handleEventListener.boundHandleMouseUp);
    };
    
    addEventListenerGlobal()
    {
        document.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    addEventListenersSafe() {
        document.addEventListener("keydown", this.handleEventListener.boundHandleKeydown);
        document.addEventListener("keyup", this.handleEventListener.boundHandleKeyUp);
        document.addEventListener("mousemove", this.handleEventListener.boundHandleMouseMove);
    };

    removeEventListenersSafe() {
        document.removeEventListener("keydown", this.handleEventListener.boundHandleKeydown);
        document.removeEventListener("keyup", this.handleEventListener.boundHandleKeyUp);
        document.removeEventListener("mousemove", this.handleEventListener.boundHandleMouseMove);
    };

    handleMouseMove(e) {
        MOUSE = UTILS.get_mouse_pos(e, this.member.camera, this.canvas);
    };

    handleMouseUp() {
        if (this.member.player.currentWeapon.shooting) {
            this.member.player.currentWeapon.shooting = false;
        };
    };

    handleMouseDown(e) {
        if (e.button == 0 && !this.member.player.currentWeapon.shooting) {
            this.member.player.currentWeapon.shooting = true;
        }
        else if (e.button == 2) {
            if (this.member.player.inventory.activeItemn + 1 > this.member.player.inventory.arsenal.length - 1) {
                this.member.player.inventory.activeItemn = 0;
                this.member.player.currentWeapon = this.member.player.inventory.arsenal[0];
                this.member.player.currentWeapon.component.matrix.bullets = [];
            }
            else {
                this.member.player.inventory.activeItemn += 1;
                this.member.player.currentWeapon = this.member.player.inventory.arsenal[this.member.player.inventory.activeItemn];
                this.member.player.currentWeapon.component.matrix.bullets = [];
            };
        };
    };

    handleKeydown(e) {
        if (e.key == "r" || e.key == "R") { this.member.player.controls.interact = true; }
        if (e.key == " ") { 
            e.preventDefault();
            this.member.player.controls.skills.teleport = true; 
        };
        if (e.key == "e" || e.key == "E") { this.member.player.controls.skills.run = true; };
        if (e.key == "f" || e.key == "F") { this.member.player.controls.skills.heal = true;};
        if (e.key == "w" || e.key == "W") { this.member.player.controls.movement.up = true; };
        if (e.key == "s" || e.key == "S") { this.member.player.controls.movement.down = true;};
        if (e.key == "a" || e.key == "A") { this.member.player.controls.movement.left = true; };
        if (e.key == "d" || e.key == "D") { this.member.player.controls.movement.right = true;};
        // Temp for testing
        if (e.key == "Enter") { this.member.player.currentWeapon.shooting = true;};
    };

    handleKeyUp(e) {
        if (e.key == "r" || e.key == "R") { this.member.player.controls.interact = false; }
        if (e.key == " ") { this.member.player.controls.skills.teleport = false; };
        if (e.key == "e" || e.key == "E") { this.member.player.controls.skills.run = false; };
        if (e.key == "f" || e.key == "F") { this.member.player.controls.skills.heal = false; };
        if (e.key == "w" || e.key == "W") { this.member.player.controls.movement.up = false; };
        if (e.key == "s" || e.key == "S") { this.member.player.controls.movement.down = false;  };
        if (e.key == "a" || e.key == "A") { this.member.player.controls.movement.left = false; };
        if (e.key == "d" || e.key == "D") { this.member.player.controls.movement.right = false; };

        // Temp for testing
        if (e.key == "Enter") { this.member.player.currentWeapon.shooting = false;};
    };
}