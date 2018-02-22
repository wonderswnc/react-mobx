import React from 'react';
import { Card } from 'antd';

class AsyncComponent extends React.Component {
  state = {
    loading: true,
    Component: null,
    data: null
  }

  componentDidMount() {
    const { callback, ...rest } = this.props;
    callback().then(modules => {
      const Component = modules.default ? modules.default : modules;
      if (Component.fetch) {
        Component.fetch(rest).then(res => {
          this.setState({
            loading: false,
            Component: Component,
            data: res
          })
        })
      } else {
        this.setState({
          loading: false,
          Component: Component
        }, () => console.log(this.state))
      }
    }).catch(() => alert('oops, you seems meet a problem, please call coder'));
  } 

  renderComponent = () => {
    const {Component, data} = this.state;
    if (data) {
      return <Component {...this.props} data={data} />
    } else {
      return <Component {...this.props}/>
    }
  }

  renderL = loading => {
    return loading ? 
      <Card
        loading
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
        <div />
      </Card> :
      this.renderComponent();
  }

  render() {
    const {loading, component, data} = this.state;
    return this.renderL(loading);
  }
}

export default function asyncComponent(importCallback) {
  return (AsyncComponent => class extends React.Component {
    render() {
      return <AsyncComponent {...this.props} callback={importCallback} />
    }
  })(AsyncComponent)
}