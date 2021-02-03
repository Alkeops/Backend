"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var States_1 = __importDefault(require("./States"));
var constants_1 = require("./constants");
var _a = new States_1.default(), state = _a.state, setState = _a.setState, deleteState = _a.deleteState, stateExists = _a.stateExists;
var app = express_1.default();
app.use(express_1.default.json());
app.get("/productos", function (req, res) {
    res.json(state.length > 0 ? state : constants_1.NO_PRODUCTS);
});
app.get("/productos/:id", function (req, res) {
    var id = req.params.id;
    var item = stateExists(id);
    res.status(item ? 200 : 404);
    res.json(item || constants_1.NOT_FOUND);
});
app.post("/productos", function (req, res) {
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
app.delete("/productos/:id", function (req, res) {
    var id = req.params.id;
    var result = deleteState(id);
    res.status(result);
    res.json(result === 404 ? constants_1.NOT_FOUND : constants_1.DELETE_SUCCESS);
});
var PORT = 8080;
var HOST = "127.0.0.1";
var server = app.listen(PORT, HOST, function () {
    return console.log(constants_1.SERVER_RUNNING + " " + HOST + ":" + PORT);
});
server.on("error", function (error) { return console.log(constants_1.SERVER_ERROR + " " + error); });
