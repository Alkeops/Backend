import express from "express";
import Archivo from "./products";

const Programa = new Archivo("productos.txt");

const app = express();

app.use(express.json());

interface Counter {
  items: number;
  item: number;
}
let visitas: Counter = { items: 0, item: 0 };

app.get("/items", async (req, res) => {
  const data = await Programa.leerArchivo();
  const response: object = { items: [...data], cantidad: [data.length + 1] };
  visitas = {
    ...visitas,
    items: visitas.items + 1,
  };
  res.json(response);
});

app.get("/item-random", async (req, res) => {
  const data = await Programa.leerArchivo();
  const randomNumber: number =
    Math.round(Math.random() * (data.length - 1) + 1) - 1;
  visitas = {
    ...visitas,
    item: visitas.item + 1,
  };
  res.json({ item: { ...data[randomNumber] } });
});

app.get("/visitas", (req, res) => {
  res.json({ visitas: visitas });
});

const PORT = 8080;
const HOST = "127.0.0.1";
const server = app.listen(PORT, HOST, () =>
  console.log(`Server running on ${HOST}:${PORT}`)
);
