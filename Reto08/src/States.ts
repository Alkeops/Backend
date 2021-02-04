interface Producto {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}
class States {
  state: Array<Producto>;
  constructor() {
    this.state = [];
  }
  setState = (data: Producto) => this.state.push(data);

  deleteState = (id: string) => {
    const product = this.stateExists(id);
    if (!product) return 404;
    const newData = this.state.filter((element) => element.id !== id);
    this.state.length = 0;
    this.state.push(...newData);
    return product;
  };

  stateExists = (id: string) => this.state.find((element) => element.id === id);

  updateState = (id: string, data: Producto) => {
    const index = this.state.findIndex((element) => element.id === id);
    if (index < 0) return 404;
    this.state[index] = { ...data };
    return 200;
  };
}

export default States;
