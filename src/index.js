import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import TestComponent from './TestComponent';
import MobxComponent from './NewComponent';
import AntdComponent from './StyledComponents';
import LazyImage from './LazyImage';
import AnimationComponent from './prectice/Animation';
import MobxReact from './prectice/MobxReact';
import Keep from './prectice/MyGoogleKeep';
// import Swiper from './components/Swiper';
import { Card } from 'antd';
import { withProps, compose } from 'recompose';
import asyncComponent from './components/AsyncComponent';

const routes= [
  {
    key: 'TestComponent',
    path: '/test',
    component: TestComponent
  },
  {
    key: 'MobxComponent',
    path: '/mobx',
    component: MobxComponent
  },
  {
    key: 'Antdcomponent',
    path: '/antd',
    component: AntdComponent
  },
  {
    key: 'Keep',
    path: '/keep',
    component: Keep
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
