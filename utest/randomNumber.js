function get_random_number(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};

let result = get_random_number(0, 10);

console.assert((result <= 10) && (result >= 0), "Generating a random number in a range has failed.");