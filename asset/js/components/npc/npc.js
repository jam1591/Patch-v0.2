class Npc {
    constructor() {
        this.interact = false;
    }

    setup(){
        this.setup_variables();
    }


    colission(player, {collide = true} = {}){
        let dx = (player.x + player.width / 2) - (this.x + this.width / 2);
        let dy = (player.y + player.height / 2) - (this.y + this.height / 2);

        let combinedHalfWidths = (player.width + this.width) / 2;
        let combinedHalfHeights = (player.height + this.height) / 2;

        if(Math.abs(dx) < combinedHalfWidths + player.width &&Math.abs(dy) < combinedHalfHeights + player.height){            
            CTX.fillStyle = "rgba(0, 0, 0, 0.1)";
            
            CTX.fillRect(this.x - 15, this.y - 15, this.width + 30, this.height + 30);

            CTX.fillStyle = "white";
            CTX.fillText(`R`, this.x + this.width/2 - 5, this.y - 27);
            CTX.fillStyle = "rgba(0, 0, 0, 0.1)";
            CTX.fillRect(this.x + this.width / 2 - 11, this.y - 40, 20, 20);

            if(collide){
                if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
                    let overlapX = combinedHalfWidths - Math.abs(dx);
                    let overlapY = combinedHalfHeights - Math.abs(dy);
        
                    if (overlapX >= overlapY) {
                        if (dy > 0) {
                            player.speedUp = 0;
                        } else {
                            player.speedDown = 0;
                        }
                    } else if (overlapX <= overlapY) {
                        if (dx > 0) {
                            player.speedLeft = 0;
                        } else {
                            player.speedRight = 0;
                        }
                    }
                } 
                else if (this.player.skills.abilities[SKILL_NAME.Run].duration > 0 && 
                    this.player.skills.abilities[SKILL_NAME.Run].duration < this.player.skills.abilities[SKILL_NAME.Run].durationRemaining) {
                    player.speedUp =  player.speedBase + this.player.skills.abilities[SKILL_NAME.Run].value;
                    player.speedDown = player.speedBase + this.player.skills.abilities[SKILL_NAME.Run].value;
                    player.speedLeft = player.speedBase + this.player.skills.abilities[SKILL_NAME.Run].value;
                    player.speedRight = player.speedBase + this.player.skills.abilities[SKILL_NAME.Run].value;
                } else {
                    player.speedUp =  player.speedBase;
                    player.speedDown = player.speedBase;
                    player.speedLeft = player.speedBase;
                    player.speedRight = player.speedBase;
                }
            }
        }
    }
    
    setup_variables() {
        this.interact = false;
    };
}