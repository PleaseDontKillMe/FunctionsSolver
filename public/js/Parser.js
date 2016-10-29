function Parser(expr) {
    this.expr = expr.eraseSpaces();

    var pattern = /^(?:(\+|\-)?([\d\.]*)x\^2)?(?:(\+|\-)?([\d\.]*)x)?(?:(\+|\-)?([\d\.]+))?$/;

    this.parse = function () {
        var matches = pattern.exec(this.expr);

        if (!matches) {
            throw new Error("Expression doesn't match the pattern");
        }

        return new Function(
            interpret(matches[1], matches[2]),
            interpret(matches[3], matches[4]),
            interpret(matches[5], matches[6])
        );
    };

    function interpret(sign, value) {
        return interpretSign(sign) * interpretValue(value);
    }

    function interpretSign(sign) {
        if (isUndefined(sign)) return 1;
        if (sign.isEmpty()) return 1;
        if (sign == "+") return 1;
        if (sign == "-") return -1;
        throw new Error("Expression doesn't match the pattern");
    }

    function interpretValue(value) {
        if (isUndefined(value)) {
            return 0;
        }
        if (value.isEmpty()) {
            return 1;
        }
        return parseFloat(value);
    }
}
