import express from "express";
import States from "./States";
import {
  NO_PRODUCTS,
  NOT_FOUND,
  DELETE_SUCCESS,
  SERVER_ERROR,
  SERVER_RUNNING,
} from "./constants";

const { state, setState, deleteState, stateExists } = new States();

const app = express();

app.use(express.json());

app.get("/productos", (req, res) => {
  res.json(state.length > 0 ? state : NO_PRODUCTS);
});

app.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const item = stateExists(id);
  res.status(item ? 200 : 404);
  res.json(item || NOT_FOUND);
});

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = {
    title,
    price,
    thumbnail,
    id: (state.length + 101).toString(),
  };
  setState(newProduct);
  res.status(201);
  res.json(newProduct);
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  const result = deleteState(id);
  res.status(result);
  res.json(result === 404 ? NOT_FOUND : DELETE_SUCCESS);
});

const PORT = 8080;
const HOST = "127.0.0.1";
const server = app.listen(PORT, HOST, () =>
  console.log(`${SERVER_RUNNING} ${HOST}:${PORT}`)
);
server.on("error", (error) => console.log(`${SERVER_ERROR} ${error}`));
