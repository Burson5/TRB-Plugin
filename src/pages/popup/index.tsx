// 模拟完整es2015+环境
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import style from './style.scss';
import HomePage from '~/routes/HomePage';

class App extends React.Component {
  render() {
    return (
      <div className={style.body}>
        <HomePage />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
