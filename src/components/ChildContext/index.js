import React from 'react';
import PropTypes from 'prop-types';

class ChildContext extends React.Component {
  static contextTypes = {
    parentNode: PropTypes.func
  }

  constructor(props, context) {
    super(props);
    this.changeTitle = context.parentNode.bind(this);
  }

  render() {
    return <h2 onClick={this.changeTitle}>{ this.props.title }</h2>
  }
}

class Child extends React.Component {

  render() {
    const {
      component: Component
    } = this.props;
    return (
      <div>
        <Component />
        <ChildContext title={this.props.title} />
      </div>
    )
  }
}

export default class ParentNode extends React.Component {
  getChildContext() {
    return {
      parentNode: this.changeTitle
    }
  }

  state = {
    count: 0
  }

  get title() {
    return `count: ${this.state.count}`
  }

  changeTitle = () => {
    this.setState(({ count }) => ({ count: ++count }));
  }

  static childContextTypes = {
    parentNode: PropTypes.func
  }

  render() {
    return (
      <Child title={this.title} component={() => <h2>hello component</h2>}/>
    )
  }
}