const form = document.querySelector("#form");
const button = document.querySelector("#button");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");
const url = "http://127.0.0.1:8080/api/productos";

let data = {};

const saveInData = ({ target: { value, name } }) => {
  data = {
    ...data,
    [name]: value,
  };
  console.log(data);
};

const api = async () => {
  const send = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await send.json();
  title.value = "";
  price.value = "";
  thumbnail.value = "";
  console.log(response);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
/* setInterval(() => {
  window.location.reload();
}, 5000); */

title.addEventListener("change", (e) => saveInData(e));
price.addEventListener("change", (e) => saveInData(e));
thumbnail.addEventListener("change", (e) => saveInData(e));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
});
button.addEventListener("click", () => api());
