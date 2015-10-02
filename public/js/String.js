String.prototype.empty = function () {
    return this == String.empty;
};

String.prototype.eraseSpaces = function () {
    return this.replace(/ /g, "");
};

String.prototype.signedExpression = function () {
    return this.isSigned() ? this : ("+" + this);
};

String.prototype.isSigned = function () {
    return this.first() == "-" || this.first() == "+";
};

String.prototype.first = function() {
    return this[0] || null;
};