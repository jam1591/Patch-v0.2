function increase_opacity(opacity, opacityTransition) {
    return opacity = Math.min(1, opacity + opacityTransition);
};

let opacity1 = 1;
let opacityTransition1 = 0.1;
let result1 = increase_opacity(opacity1, opacityTransition1);
let expected1 = 1;

console.assert(result1 == expected1, "Failed to subtract the value.");

let opacity2 = 0;
let opacityTransition2 = 0.1;
let result2 = increase_opacity(opacity2, opacityTransition2) 
let expected2 = 0.1;

console.assert(result2 == expected2, "Value is below 0");