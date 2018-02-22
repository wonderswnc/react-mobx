import React from 'react';
import './style.less';

function Popper({
  visible = 'visible',
  children,
  hideModal
}) {
  return (
    <div className='popper' style={{ visibility: visible }}>
      <div className='popper-content'>
        { children }
        <button onClick={hideModal}> click me </button>
      </div>
    </div>
  )
}

function DisplayComponent({
  content
}) {
  return (
    <h2>{ content }</h2>
  )
}

export default class TestPopper extends React.Component {
  state = {
    current: -1,
    contentArray: [
      'this is a test info',
      'this is a test info two',
      'this is a test info three'
    ],
    display: false,
    next: 2
  }

  clickHandle = () => {
    const { current, contentArray: { length } } = this.state;
    if (current === length - 1) {
      this.setState({ current: 0, display: true })
    } else {
      this.setState({ current: current + 1, display: true })
    }
  }

  hideModal = () => {
    this.state.next > 0 ?
    this.setState(({ current, next }) => ({ current: current + 1, next: next - 1 })) :
    this.setState({ display: false })
  }

  render() {
    const {
      current,
      contentArray,
      display
    } = this.state;
    console.log(this.state)
    return (
      <div>
        <h2>hi, this is a test popper page</h2>
        <button onClick={this.clickHandle}>click me to display popper</button>
        {
          display ?
          <Popper
            hideModal={this.hideModal}
          >
            <DisplayComponent content={contentArray[current]} />
          </Popper> :
          null
        }
      </div>
    )
  }
}
