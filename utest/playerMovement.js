let pressedKeyUp = false;
let pressedKeyDown = false;
let pressedKeyLeft = false;
let pressedKeyRight = false;

let x = 0;
let y = 0;
let playerSize = 10;
let speed = 1;

let mapSize = 1000;

function movementUp(startX, startY) {
    x = startX;
    y = startY;
    pressedKeyUp = true;
    if (pressedKeyUp && y - speed >= 0) { y -= speed; };
    pressedKeyUp = false;
};

function movementDown(startX, startY) {
    x = startX;
    y = startY;
    pressedKeyDown = true;
    if (pressedKeyDown && y + speed < (mapSize - playerSize)) { y += speed; };
    pressedKeyDown = false;
};

function movementLeft(startX, startY) {
    x = startX;
    y = startY;
    pressedKeyLeft = true;
    if (pressedKeyLeft && x - speed >= 0) { x -= speed; };
    pressedKeyLeft = false;
};

function movementRight(startX, startY) {
    x = startX;
    y = startY;
    pressedKeyRight = true;
    if (pressedKeyRight && x + speed < (mapSize - playerSize)) { x += speed; };
    pressedKeyRight = false;
};

movementUp(1, 1);
console.assert((x == 1) && (y == 0), "Failed to go up.");

movementDown(1, 1);
console.assert((x == 1) && (y == 2), "Failed to move down.")

movementLeft(1, 1);
console.assert((x == 0) && (y == 1), "Failed to move left.")

movementRight(1, 1);
console.assert((x == 2) && (y == 1), "Failed to move right.")

movementUp(0, 0);
console.assert((x == 0) && (y == 0), "Moved outside of the map (0,0).");

movementDown(1000, 1000);
console.assert((x == 1000) && (y == 1000), "Moved outside of the map (1000,1000).")

movementLeft(0, 0);
console.assert((x == 0) && (y == 0), "Moved outside of the map (0,0).");

movementRight(1000, 1000);
console.assert((x == 1000) && (y == 1000), "Moved outside of the map (1000,1000).")