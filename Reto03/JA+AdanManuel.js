const recorrerTexto = (texto, s = 1, callback) => {
  texto = texto.split(" ");
  s = s * 1000;
  let i = 0;
  let interval = setInterval(() => {
    console.log(texto[i]);
    if (i !== texto.length - 1) {
      i++;
    } else {
      clearInterval(interval);
      callback(texto.length);
    }
  }, s);
};

const finalizado = (cantidad) =>
  console.log(`Proceso finalizado. ${cantidad} Palabras totales`);

recorrerTexto("Pepe pecas pica papas", 0.6, (cantidad) => {
  let Total = cantidad;
  recorrerTexto("Pablito clavo un clavito", 0.4, (cantidad) => {
    Total += cantidad;
    recorrerTexto(
      "El amor es una locura que ni el cura lo cura",
      0.2,
      (cantidad) => {
        Total += cantidad;
        finalizado(Total);
      }
    );
  });
});
