
isFunction = function (object) {
    return typeof object === "function";
};

isUndefined = function(object) {
    return typeof object === "undefined";
};

isInt = function (value) {
    return value == parseInt(value);
};

Array.prototype.containsOne = function (elements) {
    for (var element in elements) {
        if (isFunction(elements[element])) continue;
        if (this.contains(elements[element]))
            return true;
    }
    return false;
};

Array.prototype.containsAll = function (elements) {
    for (var element in elements) {
        if (isFunction(elements[element])) continue;
        if (!(this.contains(elements[element])))
            return false;
    }
    return true;
};

Array.prototype.contains = function (element) {
    return this.indexOf(element) != -1;
};

Number.prototype.asSigned = function() {
    return (this < 0) ? this.toString() : ("+" + this);
};