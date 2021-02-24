"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = require("fs");
var States_1 = __importDefault(require("../States"));
var index_1 = require("../index");
var constants_1 = require("../constants");
if (!fs.existsSync("./mensajes.txt"))
    fs.writeFileSync("./mensajes.txt", JSON.stringify([]));
var io = require("socket.io")(index_1.serverHttp);
var router = express_1.default.Router();
var _a = new States_1.default(), state = _a.state, setState = _a.setState, deleteState = _a.deleteState, stateExists = _a.stateExists, updateState = _a.updateState;
var Mensajes = new States_1.default();
/*SOCKETS*/
io.on("connection", function (socket) {
    socket.emit("productos", state.length > 0 ? state : constants_1.NO_PRODUCTS);
    socket.on("producto", function (producto) {
        var title = producto.title, price = producto.price, thumbnail = producto.thumbnail;
        var newProduct = {
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: (state.length + 101).toString(),
        };
        setState(newProduct);
        io.emit("productoCargado", state);
    });
});
io.on("connection", function (socket) {
    var read = fs.readFileSync("./mensajes.txt");
    var data = JSON.parse(read);
    var mensajesGuardados = data || [];
    socket.emit("mensajes", mensajesGuardados.length > 0 ? mensajesGuardados : "Sin mensajes");
    socket.on("mensaje", function (mensaje) {
        var email = mensaje.email, sms = mensaje.sms;
        var newMensaje = {
            email: email,
            sms: sms,
            date: "" + new Date().toLocaleString("es-MX"),
            id: (data.length + 1).toString(),
        };
        data.push(newMensaje);
        fs.writeFileSync("./mensajes.txt", JSON.stringify(data));
        io.emit("mensajeEnviado", newMensaje);
    });
});
/*Rutas*/
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
    res.render("main");
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
