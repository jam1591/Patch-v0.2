let camera = {
    x: -25,
    y: -25
}

let eventMousePosition = {
    clientX: 42,
    clientY: 152
}

let canvasBoundingRect = {
    left: 40,
    top: 149
}

function get_mouse_pos(e, camera, canvas)
{   
    return {
      x: Math.floor(e.clientX - canvas.left + camera.x),
      y: Math.floor(e.clientY - canvas.top + camera.y)
    };
};

let result = get_mouse_pos(eventMousePosition, camera, canvasBoundingRect);
let expected = {
    x: -23,
    y: -22
}

console.assert(result.x == expected.x, "Mouse position x-axis calculation is incorrect.");
console.assert(result.y == expected.y, "Mouse position y-axis calculation is incorrect.");