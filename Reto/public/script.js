const socket = io();
const form = document.querySelector("#form");
const button = document.querySelector("#button");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const container = document.querySelector("#card-container");
const thumbnail = document.querySelector("#thumbnail");
const url = "http://127.0.0.1:8080/api/productos";
let data = {};

socket.on("productos", (data) => {
  completarTemplate(data);
});
socket.on("productoCargado", (data) => {
  completarTemplate(data);
});
const completarTemplate = (data) => {
  if (typeof data === "string")
    return (container.innerHTML = `<h2 class="card-container__title">No hay Productos Cargados</h2>`);
  container.innerHTML = `<h2 class="card-container__title">Productos</h2>
  <div class="card__names">
      <span>Nombre</span>
      <span>Precio</span>
      <span>Imagen</span>
  </div>`;
  data.map(({ title, price, thumbnail }) => {
    let content = `<div class="card">
        <span class="card__title">${title}</span>
        <span class="card__price">${price}</span>
        <img class="card__thumbnail" src=${thumbnail} alt="icon"></img>
      </div>`;
    container.innerHTML += content;
  });
};

//Data from form
const saveInData = ({ target: { value, name } }) => {
  data = {
    ...data,
    [name]: value,
  };
};

//Fetch
const api = async () => {
  /*   const send = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }); */

  socket.emit("producto", data);
  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

//Event Listeners

title.addEventListener("change", (e) => saveInData(e));
price.addEventListener("change", (e) => saveInData(e));
thumbnail.addEventListener("change", (e) => saveInData(e));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
});
button.addEventListener("click", () => api());
