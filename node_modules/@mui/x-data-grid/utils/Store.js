export class Store {
  static create(value) {
    return new Store(value);
  }
  constructor(_value) {
    this.value = void 0;
    this.listeners = void 0;
    this.subscribe = fn => {
      this.listeners.add(fn);
      return () => {
        this.listeners.delete(fn);
      };
    };
    this.getSnapshot = () => {
      return this.value;
    };
    this.update = value => {
      this.value = value;
      this.listeners.forEach(l => l(value));
    };
    this.value = _value;
    this.listeners = new Set();
  }
}