"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var States = /** @class */ (function () {
    function States() {
        var _this = this;
        this.setState = function (data) { return _this.state.push(data); };
        this.deleteState = function (id) {
            var _a;
            var product = _this.stateExists(id);
            if (!product)
                return 404;
            var newData = _this.state.filter(function (element) { return element.id !== id; });
            _this.state.length = 0;
            (_a = _this.state).push.apply(_a, newData);
            return product;
        };
        this.stateExists = function (id) { return _this.state.find(function (element) { return element.id === id; }); };
        this.updateState = function (id, data) {
            var index = _this.state.findIndex(function (element) { return element.id === id; });
            if (index < 0)
                return 404;
            _this.state[index] = __assign({}, data);
            return 200;
        };
        this.state = [];
    }
    return States;
}());
exports.default = States;
