let object1 = {
    x: 100,
    y: 100,
    size: 50
}

let object2 = {
    x: 110,
    y: 110,
    size: 50
}

function overlap(obj1, obj2)
{
    if (obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y)
    {
        return true;
    } 
    else 
    {
        return false;
    };
};

console.assert(overlap(object1, object2) == true, "Object are not overlapping while they should.");

object2 = {
    x: 300,
    y: 300,
    size: 50
}

console.assert(overlap(object1, object2) == false, "Object are  overlapping while they shouldn't.");
