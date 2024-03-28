const npc = {
    x: 90,
    y: 90,
    size: 10
}

const player = {
    x: 100,
    y: 90,
    size: 10,
    speed: 1
}

function collisionWithSides(){
    let dx = (player.x + player.size / 2) - (npc.x + npc.size / 2);
    let dy = (player.y + player.size / 2) - (npc.y + npc.size / 2);
    
    let combinedHalfWidths = (player.size + npc.size) / 2;
    let combinedHalfHeights = (player.size + npc.size) / 2;
    
    if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
        let overlapX = combinedHalfWidths - Math.abs(dx);
        let overlapY = combinedHalfHeights - Math.abs(dy);
        if (overlapX >= overlapY) {
            if (dy > 0) {
                return 'Colission with bottom.';
            } else {
                return 'Colission with top.';
            }
        } else if (overlapX <= overlapY) {
            if (dx > 0) {
                return 'Collission with left.';
            } else {
                return 'Collission with right.';
            }
        }
    } else {
        return false;
    }
}

function setPlayerValues(startX, startY){
    player.x = startX;
    player.y = startY;
}

setPlayerValues(100, 90);
player.x -= player.speed;
let result = collisionWithSides();
console.assert(result == "Collission with left.", "No colission Detected");

setPlayerValues(80, 90);
player.x += player.speed;
result = collisionWithSides();
console.assert(result == "Collission with right.", "No colission Detected");

setPlayerValues(90, 100);
player.y -= player.speed;
result = collisionWithSides();
console.assert(result == "Colission with bottom.", "No colission Detected");

setPlayerValues(90, 80);
player.y += player.speed;
result = collisionWithSides();
console.assert(result == "Colission with top.", "No colission Detected");

setPlayerValues(300, 300);
player.x -= player.speed;
result = collisionWithSides();
console.assert(result == false, "Incorrect collision detected.");

setPlayerValues(300, 300);
player.x += player.speed;
result = collisionWithSides();
console.assert(result == false, "Incorrect collision detected.");

setPlayerValues(300, 300);
player.y -= player.speed;
result = collisionWithSides();
console.assert(result == false, "Incorrect collision detected.");

setPlayerValues(300, 300);
player.y += player.speed;
result = collisionWithSides();
console.assert(result == false, "Incorrect collision detected.");
