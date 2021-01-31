const fs = require("fs");

class Archivo {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.dataForSave = {};
  }

  async leerArchivo(NoMostrar) {
    if (!fs.existsSync(`./${this.nombreArchivo}`)) return console.log([]);
    try {
      const read = await fs.promises.readFile(
        `./${this.nombreArchivo}`,
        "utf8"
      );
      const data = JSON.parse(read);
      if (!NoMostrar) console.log(data);
      return data;
    } catch (e) {
      console.log("Hubo un Error Al Leer");
    }
  }
  guardarEnArchivo(dataForSave) {
    this.dataForSave = dataForSave;
    if (!fs.existsSync(`./${this.nombreArchivo}`))
      fs.writeFileSync(`./${this.nombreArchivo}`, JSON.stringify([]));
    this.EscribirArchivo();
  }

  async borrarArchivo() {
    try {
      await fs.promises.unlink(`./${this.nombreArchivo}`);
      console.log("ARCHIVO ELIMINADO");
    } catch (e) {
      console.log("404");
    }
  }

  async EscribirArchivo() {
    const data = await this.leerArchivo(true);
    this.dataForSave = { ...this.dataForSave, id: data.length + 1 };
    data.push(this.dataForSave);
    try {
      await fs.promises.writeFile(
        `./${this.nombreArchivo}`,
        JSON.stringify(data)
      );
      return (this.dataForSave = {});
    } catch (e) {
      console.log("Hubo un error al escribir");
    }
  }
}

const Programa = new Archivo("productos.txt");

const json = {
  title: "ProductoAleatorioTotalmentediferente",
  price: "PrecioaleatorioTotalmentediferente",
  thumbnail: "UrlaleatoriaTotalmentediferente",
};

Programa.guardarEnArchivo(json);

/* setInterval(() => {
  Programa.guardarEnArchivo(json); AGREGA MUCHOS PRODCUTOS DE MANERA INFINITA POR QUE SI
}, 700); */

/* setTimeout(() => {
  Programa.leerArchivo(); //LEER TODOS LOS DATOS O DEVUELVE [] SI NO EXISTE
}, 1000);

setTimeout(() => {
  Programa.borrarArchivo(); //ELIMINA EL ARCHIVO SIN IMPORTARLE LOS SENTIMIENTOS DE NADIE
}, 2000);
 */
