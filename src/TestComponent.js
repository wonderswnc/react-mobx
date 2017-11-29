import React, { Component} from 'react';
import { observable, action, computed, autorun } from 'mobx';
import { observer } from 'mobx-react';

class AppStore {

  constructor() {
    this.IER = 10;
    this.logMark = autorun(() => console.log(this.count));
  }

  @observable count = 0;

  @action.bound 
  increment() {
    this.count ++;
  }

  @action.bound 
  decrement() {
    this.count --;
  }

  @computed get ten() {
    return this.count * this.IER;
  }
}

@observer
class Test extends Component {

  @observable title = '我是一个react结合mobx的测试组件哦！';

  changeTitle() {
    this.title = '已经改变！';
  }

  render() {
    console.log(this);
    return (
      <div>
        <h2>{this.title}</h2>
        <div>{this.props.store.count}</div>
        <div>{this.props.store.ten}</div>
        <button onClick={this.props.store.increment}> + </button>
        <button onClick={this.props.store.decrement}> - </button>
        <button onClick={this.changeTitle.bind(this)}>click me to change the title</button>
      </div>
    )
  }
}

class TestComponent extends Component {
  render() {
    return (
      <Test store={new AppStore()} />
    )
  }
}

export default TestComponent;