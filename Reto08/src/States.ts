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
  setState = (data: Producto) => {
    this.state.push(data);
    return;
  };
  deleteState = (id: string) => {
    if (!this.stateExists(id)) {
      return 404;
    }
    const newData = this.state.filter((element) => element.id !== id);
    this.state.length = 0;
    this.state.push(...newData);
    return 200;
  };
  stateExists = (id: string) => this.state.find((element) => element.id === id);
}

export default States;
