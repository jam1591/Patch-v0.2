const object1 = {
    x: 100,
    y: 100,
    size: 50
}

const object2 = {
    x: 110,
    y: 110,
    size: 50
}

function unit_vector(obj1, obj2)
{
    const distX = obj1.x - obj2.x;
    const distY = obj1.y - obj2.y;
    const distMag = Math.sqrt(distX**2 + distY**2);
    return {
        mag: distMag,
        nx: distX / distMag,
        ny: distY / distMag
    };
};

let result = unit_vector(object1, object2);

let expected = {
    mag: 14.142135623730951,
    nx: Math.abs(-0.7071067811865475),
    ny: Math.abs(-0.7071067811865475)
};

console.assert(result.mag - expected.mag == 0, "Failed to calculate magnitude.");
console.assert(result.nx + expected.nx == 0, "Failed to calculate normalised x-axis.");
console.assert(result.ny + expected.ny == 0, "Failed to calculate normalised y-axis.");