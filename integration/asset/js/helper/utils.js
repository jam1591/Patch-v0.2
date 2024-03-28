class Utils
{
};

Utils.prototype.get_random_number = function(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};

Utils.prototype.unit_vector = function(obj1, obj2)
{
    const distX = (obj1.x + obj1.width/2) - obj2.x;
    const distY = (obj1.y + obj1.height/2) - obj2.y;
    const distMag = Math.sqrt(distX**2 + distY**2);
    return {
        mag: distMag,
        nx: distX / distMag,
        ny: distY / distMag
    };
};

Utils.prototype.overlap = function(obj1, obj2)
{
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y)
    {
        return true;
    } 
    else 
    {
        return false;
    };
};

Utils.prototype.get_mouse_pos = function(e, camera, canvas)
{   
    let rect = canvas.getBoundingClientRect(); 
    return {
      x: 420,
      y: 200
    };
};