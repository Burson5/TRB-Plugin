import { observable, action } from 'mobx';

class Store {
  @observable random: number;

  @action setRandom = () => {
    this.random = Math.random();
  };
}

export default Store;
