import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import { Card } from 'antd';
import asyncComponent from './components/AsyncComponent';
import TestComponent from './TestComponent';
import NewComponent from './NewComponent';
import Home from './components/Home';

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
  },
  {
    key: 'Popper',
    path: '/popper',
    component: asyncComponent(() => import('./components/Popper'))
  },
  {
    key: 'RouteExample',
    path: '/route',
    component: asyncComponent(() => import('./components/RouteExample/test.js'))
  },
  {
    key: 'Hoc',
    path: '/hoc',
    component: asyncComponent(() => import('./components/Hoc'))
  },
  {
    key: 'ChildContext',
    path: '/childcontext',
    component: asyncComponent(() => import('./components/ChildContext'))
  }
]

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <Home /> */}
          <Switch>
            {
              routes.map(({key, ...config}) => <Route key={key} {...config}/>)
            }
            <Redirect from='/route' to='/route/home'/>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
