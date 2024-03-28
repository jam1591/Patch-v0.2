let degrees = 60 / (Math.PI / 180);

function calculateRadiantsUsingDegrees(degrees){
    return degrees * (Math.PI / 180)
}

let result = calculateRadiantsUsingDegrees(60);
let expected = 1.0471975511965976;

console.assert(result - expected == 0, "Incorrect radiant conversion value");