String.prototype.isEmpty = function () {
    return this == "";
};

String.prototype.eraseSpaces = function () {
    return this.replace(/ /g, "");
};

String.prototype.first = function() {
    return this[0] || null;
};