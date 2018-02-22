import React, { Component } from 'react';

class TestHoc extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    console.log('component did mount!')
  }

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  }

  render() {
    return (
      <div>
        <h2>count: {this.state.count}</h2>
        <button onClick={this.increment}>click me!</button>
      </div>
    )
  }
}

const Hoc = Component => {
  return class HocComponent extends Component {
    constructor() {
      super();
      console.log(this);
    }
  }
}

export default Hoc(TestHoc);