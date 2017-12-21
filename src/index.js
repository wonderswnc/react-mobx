import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import { Card } from 'antd';
import { withProps, compose } from 'recompose';
import asyncComponent from './components/AsyncComponent';
import TestComponent from './TestComponent';
import NewComponent from './NewComponent';

const routes= [
  {
    key: 'TestComponent',
    path: '/test',
    component: TestComponent
  },
  {
    key: 'LazyImage',
    path: '/lazyimage',
    component: asyncComponent(() => import('./components/LazyImage'))
  },
  {
    key: 'TodoList',
    path: '/todolist',
    component: asyncComponent(() => import('./components/TodoList'))
  },
  {
    key: 'NewComponent',
    path: '/new',
    component: NewComponent
  },
  {
    key: 'Swiper',
    path: '/swiper',
    component: asyncComponent(() => import('./components/Swiper')),
    exact: true
  }
]

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            {
              routes.map(({key, ...config}) => <Route key={key} {...config}/>)
            }
          </Switch>
          <Link to='swiper'>swiper</Link>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
