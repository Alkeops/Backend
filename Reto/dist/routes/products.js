"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var States_1 = __importDefault(require("../States"));
var constants_1 = require("../constants");
var router = express_1.default.Router();
var _a = new States_1.default(), state = _a.state, setState = _a.setState, deleteState = _a.deleteState, stateExists = _a.stateExists, updateState = _a.updateState;
router.get("/productos", function (req, res) {
    res.json(state.length > 0 ? state : constants_1.NO_PRODUCTS);
});
router.post("/productos", function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: (state.length + 101).toString(),
    };
    setState(newProduct);
    res.status(201);
    res.json(newProduct);
});
router.get("/productos/vista", function (req, res) {
    res.render("main", { suggestedChamps: __spreadArrays(state) });
});
router.get("/productos/:id", function (req, res) {
    var id = req.params.id;
    var item = stateExists(id);
    res.status(item ? 200 : 404);
    res.json(item || constants_1.NOT_FOUND);
});
router.delete("/productos/delete/:id", function (req, res) {
    var id = req.params.id;
    var result = deleteState(id);
    res.status(typeof result === "number" ? result : 200);
    res.json(result === 404 ? constants_1.NOT_FOUND : result);
});
router.put("/productos/update/:id", function (req, res) {
    var id = req.params.id;
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var result = updateState(id, { title: title, price: price, thumbnail: thumbnail, id: id });
    res.status(result);
    res.send(result === 404 ? constants_1.NOT_FOUND : { title: title, price: price, thumbnail: thumbnail, id: id });
});
module.exports = router;
