function ReadableSolver(func) {
    this.solver = new Solver(func);

    this.a = func.a;
    this.b = func.b;
    this.c = func.c;
    this.delta = this.solver.delta;
}

ReadableSolver.prototype.solve = function () {
    if (this.delta < 0)
        return [];

    if (this.delta == 0)
        return [this.solver.getRoot(0)];

    var squaredDelta = UnresolvedSqrt.from(this.delta);
    return [
        this.getRoot(squaredDelta.negate()),
        this.getRoot(squaredDelta)
    ];
};

ReadableSolver.prototype.getRoot = function (delta)
{
    var denominator = 2*this.a;

    if (delta.isWholeNumber())
        return this.solver.getRoot(delta.factor);

    var gcd = Math.gcd(this.b, delta.factor, denominator);
    delta.factor /= gcd;
    denominator /= gcd;
    var counter;

    if (this.b == 0) {
        counter = delta.toString(true);
    } else {
        counter = (-this.b / gcd) + " " + delta.toString();
    }

    if (denominator == 1)
        return counter;

    return "(" + counter + ") / "  + denominator;
};