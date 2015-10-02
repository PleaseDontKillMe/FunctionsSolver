
function UnresolvedSqrt(factor, sqrt, base)
{
    this.factor = factor;
    this.sqrt = sqrt;
    this.base = base;
}

UnresolvedSqrt.from = function (given) {
    if (given instanceof UnresolvedSqrt) {
        return given.copy();
    }
    if (typeof given == "number") {
        return UnresolvedSqrt.solve(given);
    }

    throw new Error("Unsupported variable type");
};

UnresolvedSqrt.solve = function(original) {

    var squaredNumber = Math.sqrt(original);

    if (isInt(squaredNumber))
        return new UnresolvedSqrt(squaredNumber, 1, original);

    for (var i = original; i > 1; i--)
    {
        var squaredDivider = Math.sqrt(i),
            rest = original/i;

        if (isInt(squaredDivider) && isInt(rest))
            return new UnresolvedSqrt(squaredDivider, rest, original);
    }

    return new UnresolvedSqrt(1, original, original);
};


UnresolvedSqrt.prototype.toString = function(omitSign) {
    if (this.isWholeNumber()) {
        return this.signedFactor();
    }
    if (this.isSingle()) {
        return (omitSign ? "":this.sign()+" ") + "&radic;" + this.sqrt;
    }
    return this.signedFactor(omitSign) + "&radic;" + this.sqrt;
};

UnresolvedSqrt.prototype.negate = function() {
    var copy = this.copy();
    copy.factor *= -1;
    return copy;
};

UnresolvedSqrt.prototype.copy = function () {
    return new UnresolvedSqrt(this.factor, this.sqrt, this.base);
};

UnresolvedSqrt.prototype.signedFactor = function (omitSign) {
    if (omitSign) {
        return this.factor.toString();
    }
    return this.sign() + " " + Math.abs(this.factor);
};

UnresolvedSqrt.prototype.sign = function () {
    return (this.factor < 0) ? "-" : "+";
};

UnresolvedSqrt.prototype.isSingle = function () {
    return Math.abs(this.factor) == 1;
};

UnresolvedSqrt.prototype.isWholeNumber = function () {
    return this.sqrt == 1;
};

