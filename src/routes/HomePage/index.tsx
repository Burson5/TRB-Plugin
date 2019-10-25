import React, { Component } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Store from './store';
import style from './style.scss';

@observer
class HomePage extends Component {
  store: Store;
  constructor(props) {
    super(props);
    this.store = new Store();
  }
  render() {
    return (
      <div>
        <div className={style.main}>HomePage</div>
        <div>random:{this.store.random}</div>
        <Button type="primary" onClick={this.store.setRandom}>
          change
        </Button>
      </div>
    );
  }
}

export default HomePage;
