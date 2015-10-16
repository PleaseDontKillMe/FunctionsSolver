
Math.gcd = gcd;

function gcd() {
    if (arguments.length == 0)
        throw new Error("No arguments for GCD");
    if (arguments.length == 1)
        return arguments[0];
    return multipleGcd(arguments);
}

function multipleGcd(array)
{
    var g = array[0];
    for (var i = 1; i < array.length; i++) {
        g = generalGcd(g, array[i]);
    }
    return g;
}

function generalGcd(a, b) {

    if (a < 0 && b < 0)
        return -this.positiveGcd(-a, -b);


    return this.positiveGcd(Math.abs(a), Math.abs(b));
}

function positiveGcd(a, b) {
    return b == 0 ? a : this.positiveGcd(b, a % b);
}

function Vector(x,y)
{
    this.x = x;
    this.y = y;

    this.distanceTo = function(x,y) {
        return Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(y - this.y, 2));
    };

    this.length = function() {
        return this.distanceTo(0, 0);
    }
}
