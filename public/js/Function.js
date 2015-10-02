function Function(a,b,c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.valueOf = function(x) {
        return this.a * x * x + this.b * x + this.c;
    };

    this.getRoot = function() {
        return new ReadableSolver(this).solve();
    };

    this.asArray = function() {
        return [
            this.a, this.b, this.c
        ];
    }
}