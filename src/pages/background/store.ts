class Store {
  static instance: Store;

  constructor() {
    if (!Store.instance) {
      let self = this;
      Store.instance = self;
    }
    return Store.instance;
  }
}

export default Store;
