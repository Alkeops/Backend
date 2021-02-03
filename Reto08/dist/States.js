"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var States = /** @class */ (function () {
    function States() {
        var _this = this;
        this.setState = function (data) {
            _this.state.push(data);
            return;
        };
        this.deleteState = function (id) {
            var _a;
            if (!_this.stateExists(id)) {
                return 404;
            }
            var newData = _this.state.filter(function (element) { return element.id !== id; });
            _this.state.length = 0;
            (_a = _this.state).push.apply(_a, newData);
            return 200;
        };
        this.stateExists = function (id) { return _this.state.find(function (element) { return element.id === id; }); };
        this.state = [];
    }
    return States;
}());
exports.default = States;
