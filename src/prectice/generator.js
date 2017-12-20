import React from 'react';

function* generatorPrectice() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

const a = generatorPrectice();

for (let item of a) {
  console.log(item);
}

@Hoc
class Test extends React.Component {
  render() {
    return <div></div>
  }
}

function Hoc(Component) {
  return class extends React.Component {
    render() {
      return <Component {...this.props} test='hoc withProps' />
    }
  }
}
