import express from "express";

import { SERVER_ERROR, SERVER_RUNNING } from "./constants";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/products"));

app.get("/api", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const PORT = 8080;
const HOST = "127.0.0.1";
const server = app.listen(PORT, HOST, () =>
  console.log(`${SERVER_RUNNING} ${HOST}:${PORT}`)
);
server.on("error", (error) => console.log(`${SERVER_ERROR} ${error}`));
