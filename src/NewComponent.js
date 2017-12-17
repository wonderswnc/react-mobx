import React, { Fragment } from 'react';
import { observable, action, computed, observe, autorun } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import { withProps } from 'recompose';
import PropTypes from 'prop-types';
import { Button } from 'antd'; 

const Head = styled.h2`
  font-size: 16px;
  line-height: 20px;
  background-color: yellow;
`;

const Rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
    background-color: #fff;
  }
  50% {
    transform: rotate(90deg);
    background-color: #000;
  }
  100% {
    transform: rotate(360deg);
    background-color: #eee;
  }
`;

const Rotate = styled.div`
  animation: ${Rotate360} 2s linear infinite;
  width: 100px;
  height: 100px;
  background-color: #fff;
`;

class Store {
  @observable data = observable.array(['test1', 'test2']);
  @action.bound
  changeData() {
    this.data[1] = 'hi,i has changed!';
  }
}

const store = new Store();

@inject(store => ({data: store.store.data}))
@observer
class MobxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.autoRunMark = autorun(() => {
      console.log(this.count_2);
    });
  }

  @observable count = 0;
  @observable count_2 = 0;

  increment = () => {
    this.count ++;
  }

  decrement = () => {
    this.count --;
  }

  syncCount = () => {
    this.count_2 = this.count;
  }

  render() {
    return (
      <div>
        <h2>{this.count}</h2>
        <Head>this is a test styled-components tag</Head>
        <button onClick={this.increment}> + </button>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.syncCount}> sync data </button>
        <button onClick={store.changeData}> click me! </button>
        <Button ></Button>
        <Rotate />
        {
          this.props.data.map(item => <div key={item}>{item}</div>)
        }
      </div>
    )
  }
}

function Plugin({ children }) {
  return <div>{ children }</div>
}

Plugin.propTypes = {
  name: PropTypes.string.isRequired
}


class Ul extends React.Component {
  
  static Plugin = Plugin;

  state = {
    use: '123'
  }

  render() {

    const nextComponent = this.props.children.filter(child => child.props.name === this.state.use);
    return (
      <div>
        { nextComponent }
        <button onClick={() => this.setState(state => ({use: state.use === '123' ? '456' : '123'}))}>click me change view !</button>
      </div>
    )
  }
}

class Div extends React.Component {

  state = {
    use: 'test1'
  }

  changeView = () => {
    this.setState(state => ({use: state.use === 'test1' ? 'test2' : 'test1'}))
  }

  renderChildren = childName => {
    const { children } = this.props;
    let nextShowChild = null;
    children.forEach(item => item.props.name === childName && (nextShowChild = item));
    return nextShowChild;
  }

  
  render() {

    return (
      <div>
        <div>{this.renderChildren(this.state.use)}</div>
        <button onClick={this.changeView}>change view!</button>
      </div>
    )
  }
}

class Wrapper extends React.Component {
  render() {
    return (
      <Div>
        <Provider name="test1" store={store} data="456">
          <MobxComponent /> 
        </Provider>
        <div name="test2">
          <Ul>
            <Ul.Plugin name="123">
              <div>test msg , i am No.1!</div>
            </Ul.Plugin>
            <Ul.Plugin name="456">
              <div>test msg 2 hahaha</div>
            </Ul.Plugin>
          </Ul>
          <Button>i am a test antd component!</Button>
        </div>
      </Div>
    )
  }
}

export default withProps(props => {props = {a:123};return props})(Wrapper);