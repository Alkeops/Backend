"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var constants_1 = require("./constants");
var app = express_1.default();
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use("/api", require("./routes/products"));
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.get("/api", function (req, res) {
    res.render("main", { suggestedChamps: [] });
});
var PORT = 8080;
var HOST = "127.0.0.1";
var server = app.listen(PORT, HOST, function () {
    return console.log(constants_1.SERVER_RUNNING + " " + HOST + ":" + PORT);
});
server.on("error", function (error) { return console.log(constants_1.SERVER_ERROR + " " + error); });
