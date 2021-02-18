import express from "express";
import handlebars from "express-handlebars";
import http from "http";

import { SERVER_ERROR, SERVER_RUNNING } from "./constants";

const app = express();
export const serverHttp = http.createServer(app);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", require("./routes/products"));

app.set("view engine", "hbs");
app.set("views", "./src/views");

const PORT = 8080;
const HOST = "127.0.0.1";
const server = serverHttp.listen(PORT, HOST, () =>
  console.log(`${SERVER_RUNNING} ${HOST}:${PORT}`)
);
server.on("error", (error) => console.log(`${SERVER_ERROR} ${error}`));
