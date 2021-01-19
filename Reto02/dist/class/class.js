"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta = exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(n1, n2) {
        var _this = this;
        this.resultado = function () { return _this.n1 + _this.n2; };
        this.n1 = n1;
        this.n2 = n2;
    }
    return Suma;
}());
exports.Suma = Suma;
var Resta = /** @class */ (function () {
    function Resta(n1, n2) {
        var _this = this;
        this.resultado = function () { return _this.n1 - _this.n2; };
        this.n1 = n1;
        this.n2 = n2;
    }
    return Resta;
}());
exports.Resta = Resta;
