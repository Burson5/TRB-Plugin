// 模拟完整es2015+环境
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import Root from '~/stores';
import BackScript from './script';

class App extends Component {
  backScript: BackScript;
  constructor(props) {
    super(props);
    this.backScript = new BackScript();
  }

  render() {
    const dom = this.props.children || '';
    return dom;
  }
}

render(
  <App>
    <Provider {...new Root()}>
      <div>background</div>
    </Provider>
  </App>,
  document.getElementById('root')
);
