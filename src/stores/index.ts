import { observable } from 'mobx';

class Root {
  @observable static instance;
  constructor() {
    if (!Root.instance) {
      let self = this;
      Root.instance = self;
    }
    return Root.instance;
  }
}
export default Root;
