import express from "express";
import States from "../States";

import { NO_PRODUCTS, NOT_FOUND, DELETE_SUCCESS } from "../constants";

const router = express.Router();
const { state, setState, deleteState, stateExists, updateState } = new States();

router.get("/productos", (req, res) => {
  res.json(state.length > 0 ? state : NO_PRODUCTS);
});
router.post("/productos", (req, res) => {
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

router.get("/productos/vista", (req, res) => {
  res.render("index", { suggestedChamps: [...state] });
});

router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const item = stateExists(id);
  res.status(item ? 200 : 404);
  res.json(item || NOT_FOUND);
});

router.delete("/productos/delete/:id", (req, res) => {
  const { id } = req.params;
  const result = deleteState(id);
  res.status(typeof result === "number" ? result : 200);
  res.json(result === 404 ? NOT_FOUND : result);
});

router.put("/productos/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const result = updateState(id, { title, price, thumbnail, id });
  res.status(result);
  res.send(result === 404 ? NOT_FOUND : { title, price, thumbnail, id });
});

module.exports = router;
