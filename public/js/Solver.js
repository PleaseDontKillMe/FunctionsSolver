function Solver(func) {
    this.a = func.a;
    this.b = func.b;
    this.c = func.c;
    this.delta = this.getDelta();
}

Solver.prototype.solve = function () {
    if (this.delta < 0) {
        return [];
    }

    if (this.delta == 0) {
        return [this.getRoot(0)];
    }

    return [
        this.getRoot(-Math.sqrt(this.delta)),
        this.getRoot(Math.sqrt(this.delta))
    ]
};

Solver.prototype.getDelta = function () {
    return this.b * this.b - 4 * this.a * this.c;
};

Solver.prototype.getRoot = function (delta) {
    return (delta - this.b) / (2 * this.a);
};