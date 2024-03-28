function decrease_opacity(opacity, opacityTransition) {
    return opacity = Math.max(0, opacity - opacityTransition);
};

let opacity1 = 1;
let opacityTransition1 = 0.1;
let result1 = decrease_opacity(opacity1, opacityTransition1);
let expected1 = 0.9;

console.assert(result1 == expected1, "Failed to subtract the value.");

let opacity2 = 0;
let opacityTransition2 = 0.1;
let result2 = decrease_opacity(opacity2, opacityTransition2) 
let expected2 = 0;

console.assert(result2 == expected2, "Value is below 0");