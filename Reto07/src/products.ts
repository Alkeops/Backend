const fs = require("fs");

class Archivo {
  nombreArchivo: string;
  dataForSave: object;
  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
    this.dataForSave = {};
  }
  archivoExiste() {
    return fs.existsSync(`${__dirname}/${this.nombreArchivo}`);
  }
  async leerArchivo() {
    if (!this.archivoExiste()) return console.log([]);
    try {
      const read = await fs.promises.readFile(
        `${__dirname}/${this.nombreArchivo}`,
        "utf8"
      );
      const data = JSON.parse(read);
      return data;
    } catch (e) {
      console.log(`Error ${e}`);
    }
  }
  async borrarArchivo() {
    try {
      await fs.promises.unlink(`./${this.nombreArchivo}`);
      console.log("ARCHIVO ELIMINADO");
    } catch (e) {
      console.log(`Error ${e}`);
    }
  }
  guardarEnArchivo(dataForSave: object) {
    this.dataForSave = dataForSave;
    if (!this.archivoExiste())
      fs.writeFileSync(`./${this.nombreArchivo}`, JSON.stringify([]));
    this.EscribirArchivo();
  }
  async EscribirArchivo() {
    const data = await this.leerArchivo();
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
export default Archivo;
