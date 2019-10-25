import Store from './store';

class BackScript {
  store: Store;
  constructor() {
    console.log('[shopReport] background载入');
    this.store = new Store();
  }
}

export default BackScript;
