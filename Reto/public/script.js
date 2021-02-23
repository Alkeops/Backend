const socket = io();
const form = document.querySelector("#form");
const button = document.querySelector("#button");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const container = document.querySelector("#card-container");
const thumbnail = document.querySelector("#thumbnail");
//Mensajes
const whatsappButton = document.querySelector("#whatsapp");
const whatsappBox = document.querySelector("#whatsapp-box");
const inputEmail = document.querySelector("#email");
const inputMensaje = document.querySelector("#mensajeSMS");
const botonMensaje = document.querySelector("#send_button");
const whatsappContent = document.querySelector("#whatsapp__content");
//API
const url = "http://127.0.0.1:8080/api/productos";
let data = {};
let mensaje = {};

//Socket
socket.on("productos", (data) => {
  completarTemplate(data);
});
socket.on("productoCargado", (data) => {
  completarTemplate(data);
});
socket.on("mensajes", (data) => {
  templateMensaje(data);
});
socket.on("mensajeEnviado", (data) => {
  templateMensaje([data]);
});

//Templates
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
const templateMensaje = (data) => {
  if (typeof data === "string") return false;
  data.map(({ email, date, sms }) => {
    let content = `<div class="mensaje">
    <div class="mensaje__info">
        <span class="email">${email}</span>
        <span class="fecha">[ ${date} ]</span>
    </div>
    <span class="sms">${sms}</span>
</div>`;
    whatsappContent.innerHTML += content;
  });
  whatsappContent.scrollTop = whatsappContent.scrollHeight;
};
//Data from form
const saveInData = ({ target: { value, name } }) => {
  data = {
    ...data,
    [name]: value,
  };
};
const saveInSms = ({ target: { value, name } }) => {
  mensaje = {
    ...mensaje,
    [name]: value,
  };
};
//Fetch
const api = () => {
  socket.emit("producto", data);
  title.value = "";
  price.value = "";
  thumbnail.value = "";
};
const sendMensaje = () => {
  if (inputEmail.value === "" || inputMensaje.value === "") return false;
  socket.emit("mensaje", mensaje);
  inputEmail.readOnly = true;
  inputMensaje.value = "";
};

//EVENT LISTENERS

title.addEventListener("change", (e) => saveInData(e));
price.addEventListener("change", (e) => saveInData(e));
thumbnail.addEventListener("change", (e) => saveInData(e));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
});
button.addEventListener("click", () => api());
whatsappButton.addEventListener("click", () =>
  whatsappBox.classList.toggle("whatsapp-box__active")
);
//Mensajes
inputEmail.addEventListener("change", (e) => saveInSms(e));
inputMensaje.addEventListener("change", (e) => saveInSms(e));
botonMensaje.addEventListener("click", () => sendMensaje());
